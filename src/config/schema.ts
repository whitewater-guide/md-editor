import { Schema, SchemaSpec } from 'prosemirror-model';

// Based on https://github.com/ProseMirror/prosemirror-markdown
// Changes:
// - removed code block
// - removed headings except for h1 and h2
// - removed image
const spec: SchemaSpec = {
  nodes: {
    doc: {
      content: 'block+',
    },

    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0];
      },
    },

    blockquote: {
      content: 'block+',
      group: 'block',
      parseDOM: [{ tag: 'blockquote' }],
      toDOM() {
        return ['blockquote', 0];
      },
    },

    horizontal_rule: {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM() {
        return ['div', ['hr']];
      },
    },

    heading: {
      attrs: { level: { default: 1 } },
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
      ],
      toDOM(node: any) {
        return ['h' + node.attrs.level, 0];
      },
    },

    ordered_list: {
      content: 'list_item+',
      group: 'block',
      attrs: { order: { default: 1 }, tight: { default: false } },
      parseDOM: [{
        tag: 'ol', getAttrs(dom: any) {
          return {
            order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1,
            tight: dom.hasAttribute('data-tight'),
          };
        },
      }],
      toDOM(node: any) {
        return ['ol', {
          start: node.attrs.order === 1 ? null : node.attrs.order,
          'data-tight': node.attrs.tight ? 'true' : null,
        }, 0] as any;
      },
    },

    bullet_list: {
      content: 'list_item+',
      group: 'block',
      attrs: { tight: { default: false } },
      parseDOM: [{ tag: 'ul', getAttrs: (dom: any) => ({ tight: dom.hasAttribute('data-tight') }) }],
      toDOM(node: any) {
        return ['ul', { 'data-tight': node.attrs.tight ? 'true' : null }, 0] as any;
      },
    },

    list_item: {
      content: 'paragraph block*',
      defining: true,
      parseDOM: [{ tag: 'li' }],
      toDOM() {
        return ['li', 0];
      },
    },

    text: {
      group: 'inline',
      toDOM(node: any) {
        return node.text;
      },
    },

    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br'];
      },
    },
  },

  marks: {
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' },
        { style: 'font-style', getAttrs: value => value === 'italic' && null }],
      toDOM() {
        return ['em'];
      },
    },

    strong: {
      parseDOM: [{ tag: 'b' }, { tag: 'strong' },
        { style: 'font-weight', getAttrs: (value: any) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null }],
      toDOM() {
        return ['strong'];
      },
    },

    strikethrough: {
      parseDOM: [
        { tag: 'strike' },
        { style: 'text-decoration:line-through' },
        { style: 'text-decoration-line:line-through' },
      ],
      toDOM: () => ['span', { style: 'text-decoration-line:line-through' }],
    },

    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [{
        tag: 'a[href]', getAttrs(dom: any) {
          return { href: dom.getAttribute('href'), title: dom.getAttribute('title') };
        },
      }],
      toDOM(node: any) {
        return ['a', node.attrs];
      },
    },

  },
};

const schema = new Schema(spec);

export default schema;
