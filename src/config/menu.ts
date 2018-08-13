import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { MarkType, NodeType } from 'prosemirror-model';
import { wrapInList } from 'prosemirror-schema-list';
import { EditorState, NodeSelection } from 'prosemirror-state';
import * as React from 'react';
import { Dispatch } from '../types';
import icons from '../icons';
import { schema } from './schema';

const markActive = (type: MarkType) => (state: EditorState): boolean => {
  const { from, $from, to, empty } = state.selection;

  return empty ?
    !!type.isInSet(state.storedMarks || $from.marks()) :
    state.doc.rangeHasMark(from, to, type);
};

const blockActive = (type: NodeType, attrs = {}) => (state: EditorState) => {
  const { $from, to } = state.selection;

  if (state.selection instanceof NodeSelection && state.selection.node) {
    return state.selection.node.hasMarkup(type, attrs);
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

const promptForURL = () => {
  let url = window && window.prompt('Enter the URL', 'https://');

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  return url;
};

export interface MenuItem {
  title: string;
  content: React.ReactNode;
  /**
   * A predicate function to determine whether the item is 'active' (for
   * example, the item for toggling the strong mark might be active then
   * the cursor is in strong text).
   * @param state
   */
  active?: (state: EditorState) => boolean;
  /**
   * Function that is used to determine if the item is enabled. If
   * given and returning false, the item will be given a disabled
   * styling.
   * @param state
   * @param dispatch
   */
  enable?: (state: EditorState, dispatch?: Dispatch) => boolean;
  /**
   * The function to execute when the menu item is activated.
   * @param state
   * @param dispatch
   */
  run: (state: EditorState, dispatch: Dispatch) => boolean;
}

export type MenuGroup = { [key: string]: MenuItem };
export type MenuConfig = { [key: string]: MenuGroup };

export const menu: MenuConfig = {
  marks: {
    strong: {
      title: 'Toggle bold',
      content: icons.bold,
      active: markActive(schema.marks.strong),
      run: toggleMark(schema.marks.strong),
    },
    italic: {
      title: 'Toggle italic',
      content: icons.italic,
      active: markActive(schema.marks.em),
      run: toggleMark(schema.marks.em),
    },
    link: {
      title: 'Add or remove link',
      content: icons.link,
      active: markActive(schema.marks.link),
      enable: (state: EditorState) => !state.selection.empty,
      run: (state: EditorState, dispatch: Dispatch) => {
        if (markActive(schema.marks.link)(state)) {
          toggleMark(schema.marks.link)(state, dispatch);
          return true;
        }

        const href = promptForURL();
        if (!href) {
          return false;
        }

        return toggleMark(schema.marks.link, { href })(state, dispatch);
      },
    },
  },
  blocks: {
    plain: {
      title: 'Change to paragraph',
      content: icons.paragraph,
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph),
    },
    h1: {
      title: 'Change to heading level 1',
      content: icons.heading1,
      active: blockActive(schema.nodes.heading, { level: 1 }),
      enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: setBlockType(schema.nodes.heading, { level: 1 }),
    },
    h2: {
      title: 'Change to heading level 2',
      content: icons.heading2,
      active: blockActive(schema.nodes.heading, { level: 2 }),
      enable: setBlockType(schema.nodes.heading, { level: 2 }),
      run: setBlockType(schema.nodes.heading, { level: 2 }),
    },
    blockquote: {
      title: 'Wrap in block quote',
      content: icons.blockquote,
      active: blockActive(schema.nodes.blockquote),
      enable: wrapIn(schema.nodes.blockquote),
      run: wrapIn(schema.nodes.blockquote),
    },
    bullet_list: {
      title: 'Wrap in bullet list',
      content: icons.bullet_list,
      active: blockActive(schema.nodes.bullet_list),
      enable: wrapInList(schema.nodes.bullet_list),
      run: wrapInList(schema.nodes.bullet_list),
    },
    ordered_list: {
      title: 'Wrap in ordered list',
      content: icons.ordered_list,
      active: blockActive(schema.nodes.ordered_list),
      enable: wrapInList(schema.nodes.ordered_list),
      run: wrapInList(schema.nodes.ordered_list),
    },
  },
  history: {
    undo: {
      title: 'Undo last change',
      content: icons.undo,
      enable: undo,
      run: undo,
    },
    redo: {
      title: 'Redo last undone change',
      content: icons.redo,
      enable: redo,
      run: redo,
    },
  },
};
