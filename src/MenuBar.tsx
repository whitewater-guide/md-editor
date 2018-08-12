import { EditorState, Transaction } from 'prosemirror-state';
import React from 'react';
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
    marginRight: 4,
  },
};

const MenuBar: React.SFC<Props> = ({ children, state, dispatch }) => (
  <div style={styles.bar}>
    {children && (
      <span style={styles.group}>
        {children}
      </span>
    )}

    {Object.entries(menu).map(([key, group]) => (
      <span key={key} style={styles.group}>
        {Object.entries(group).map(([key, button]) => (
          <MenuButton item={button} dispatch={dispatch} state={state} />
        ))}
      </span>
    ))}
  </div>
);

export default MenuBar;
