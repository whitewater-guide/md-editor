import { EditorState, Transaction } from 'prosemirror-state';

export type Dispatch = (tr: Transaction) => void;

export interface CombinedState {
  isMarkdown: boolean;
  prosemirror: EditorState;
  markdown: string | null;
}
