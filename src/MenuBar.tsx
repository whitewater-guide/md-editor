import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { EditorState, Transaction } from 'prosemirror-state';
import React from 'react';
import { menu } from './config';
import MenuButton from './MenuButton';
import ToolbarProps = __MaterialUI.Toolbar.ToolbarProps;

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  markdownMode: boolean;
  toolbarProps?: ToolbarProps;
}

const MenuBar: React.SFC<Props> = ({ children, state, dispatch, markdownMode, toolbarProps }) => (
  <Toolbar {...toolbarProps}>
    <ToolbarGroup firstChild>
    {Object.entries(menu).map(([key, group]) => (
      <React.Fragment key={key}>
        {Object.entries(group).map(([key, button]) => (
          <MenuButton key={key} item={button} dispatch={dispatch} state={state} markdownMode={markdownMode} />
        ))}
        <ToolbarSeparator />
      </React.Fragment>
    ))}
    {children}
    </ToolbarGroup>
  </Toolbar>
);

export default MenuBar;
