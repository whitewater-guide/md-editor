import { ToolbarProps } from '@material-ui/core/Toolbar';
import { EditorState } from 'prosemirror-state';
import React from 'react';

export interface MdEditorValue {
  isMarkdown: boolean;
  prosemirror: EditorState;
  markdown: string | null;
}

export interface MdEditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value: MdEditorValue;
  className?: string;
  toolbarProps?: ToolbarProps;
  rememberMdSwitch?: boolean;
  // Formik compatibility
  name?: string;
  onChangeCompat?: (
    e: React.ChangeEvent<{ name?: string; value: MdEditorValue }>,
  ) => void;
}

export declare class MdEditor extends React.PureComponent<MdEditorProps> {}

export declare const fromMarkdown: (markdown?: string | null) => MdEditorValue;

export declare const toMarkdown: (
  value: MdEditorValue,
  nullify?: boolean,
) => string | null;

export declare const toggleMarkdown: (value: MdEditorValue) => MdEditorValue;
