import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { EditorState, Transaction } from 'prosemirror-state';
import React from 'react';
import menu from './config/menu';
import MenuButton from './MenuButton';

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
}

const MenuBar: React.SFC<Props> = ({ children, state, dispatch }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
    {Object.entries(menu).map(([key, group]) => (
      <React.Fragment>
        {Object.entries(group).map(([key, button]) => (
          <MenuButton key={key} item={button} dispatch={dispatch} state={state} />
        ))}
        <ToolbarSeparator />
      </React.Fragment>
    ))}
    {children}
    </ToolbarGroup>
  </Toolbar>
);

export default MenuBar;
