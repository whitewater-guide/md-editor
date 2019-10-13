import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown';
import { EditorState } from 'prosemirror-state';
import { MdEditorValue } from '../types';
import { plugins, schema } from './config';

export const fromMarkdown = (markdown?: string | null): MdEditorValue => ({
  isMarkdown: false,
  markdown: null,
  prosemirror: EditorState.create({
    schema,
    plugins,
    doc: defaultMarkdownParser.parse(markdown || ''),
  }),
});

export const toMarkdown = (
  value: MdEditorValue,
  nullify = true,
): string | null => {
  const { prosemirror, markdown, isMarkdown } = value;
  const text = isMarkdown
    ? markdown
    : defaultMarkdownSerializer.serialize(prosemirror.doc);
  const trimmed = (text || '').trim();
  return nullify ? trimmed || null : trimmed;
};

export const toggleMarkdown = (value: MdEditorValue): MdEditorValue => {
  const { isMarkdown, markdown, prosemirror } = value;
  return {
    isMarkdown: !isMarkdown,
    markdown: isMarkdown
      ? null
      : defaultMarkdownSerializer.serialize(prosemirror.doc),
    prosemirror: isMarkdown
      ? EditorState.create({
          schema,
          plugins,
          doc: defaultMarkdownParser.parse(markdown!),
        })
      : prosemirror,
  };
};
