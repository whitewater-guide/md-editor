import IconButton from 'material-ui/IconButton';
import { EditorState, Transaction } from 'prosemirror-state';
import React, { MouseEvent } from 'react';
import { MenuItem } from './config/menu';

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  item: MenuItem;
}

interface State {
  isActive: boolean;
  isDisabled: boolean;
}

class MenuButton extends React.PureComponent<Props> {
  static getDerivedStateFromProps = ({ item, state }: Props): State => ({
    isActive: !!item.active && item.active(state),
    isDisabled: !!item.enable && !item.enable(state),
  });

  readonly state: State = MenuButton.getDerivedStateFromProps(this.props);

  onClick = (e: MouseEvent) => {
    const { state, dispatch, item } = this.props;
    e.preventDefault();
    item.run(state, dispatch);
  };

  render() {
    const { item } = this.props;
    const { isActive, isDisabled } = this.state;
    return (
      <IconButton
        title={item.title}
        tooltip={item.title}
        disabled={isDisabled}
        onClick={this.onClick}
        iconStyle={{ color: isActive ? '#000' : '#777' }}
      >
        {item.content}
      </IconButton>
    );
  }

}

export default MenuButton;
