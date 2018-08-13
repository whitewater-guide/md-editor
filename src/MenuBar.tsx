import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { EditorState, Transaction } from 'prosemirror-state';
import React from 'react';
import { menu } from './config';
import MenuButton from './MenuButton';

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  markdownMode: boolean;
}

const MenuBar: React.SFC<Props> = ({ children, state, dispatch, markdownMode }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
    {Object.entries(menu).map(([key, group]) => (
      <React.Fragment>
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
