import { EditorState } from 'prosemirror-state';
import React from 'react';

export interface MdEditorValue {
  isMarkdown: boolean;
  prosemirror: EditorState;
  markdown: string | null;
}

export interface EditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value?: MdEditorValue;
}

export declare class Editor extends React.PureComponent<EditorProps> {}

export default Editor;
