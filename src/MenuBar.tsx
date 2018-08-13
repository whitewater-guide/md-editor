import { EditorState, Transaction } from 'prosemirror-state';
import Paper from 'material-ui/Paper';
import React from 'react';
import MarkdownToggle from './MarkdownToggle';
import MenuButton from './MenuButton';
import menu from './config/menu';

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
}

const styles = {
  bar: {
    display: 'flex',
    marginBottom: 4,
    alignItems: 'baseline',
  },
  group: {
    marginRight: 16,
  },
};

const MenuBar: React.SFC<Props> = ({ state, dispatch }) => (
  <Paper style={styles.bar}>
    {Object.entries(menu).map(([key, group]) => (
      <span key={key} style={styles.group}>
        {Object.entries(group).map(([key, button]) => (
          <MenuButton key={key} item={button} dispatch={dispatch} state={state} />
        ))}
      </span>
    ))}
    <span style={styles.group}>
      <MarkdownToggle />
    </span>
  </Paper>
);

export default MenuBar;
