import { EditorState, Transaction } from 'prosemirror-state';
import React, { MouseEvent } from 'react';
import { MenuItem } from './config/menu';

const style = {
  background: '#fff',
  border: 'none',
  fontSize: 'inherit',
  cursor: 'pointer',
  color: '#777',
  borderRadius: 0,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
};

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  item: MenuItem;
}

class MenuButton extends React.PureComponent<Props> {
  onClick = (e: MouseEvent) => {
    const { state, dispatch, item } = this.props;
    e.preventDefault();
    item.run(state, dispatch);
  };

  render() {
    const { state, dispatch, item } = this.props;
    return (
      <button
        type="button"
        style={style}
        title={item.title}
        disabled={item.enable && !item.enable(state, dispatch)}
        onClick={this.onClick}
      >
        {item.content}
      </button>
    );
  }

}

export default MenuButton;
