import { EditorState, Transaction } from 'prosemirror-state';
import React, { MouseEvent } from 'react';
import { MenuItem } from './config/menu';
import IconButton from 'material-ui/IconButton';

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
      <IconButton
        title={item.title}
        tooltip={item.title}
        disabled={item.enable && !item.enable(state, dispatch)}
        onClick={this.onClick}
      >
        {item.content}
      </IconButton>
    );
  }

}

export default MenuButton;
