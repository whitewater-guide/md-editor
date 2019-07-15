import { ToolbarProps } from '@material-ui/core/Toolbar';
import { EditorState } from 'prosemirror-state';
import React, { CSSProperties } from 'react';

export interface MdEditorValue {
  isMarkdown: boolean;
  prosemirror: EditorState;
  markdown: string | null;
}

export interface MdEditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value?: MdEditorValue;
  containerStyle?: CSSProperties;
  toolbarProps?: ToolbarProps;
}

export declare class MdEditor extends React.PureComponent<MdEditorProps> {}

export declare const fromMarkdown: (markdown?: string | null) => MdEditorValue;

export declare const toMarkdown: (
  value: MdEditorValue,
  nullify?: boolean,
) => string | null;
