import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { EditorState, Transaction } from 'prosemirror-state';
import React, { MouseEvent } from 'react';
import MuiThemeProviderProps = __MaterialUI.Styles.MuiThemeProviderProps;
import { MenuItem } from './config';

interface Props extends MuiThemeProviderProps {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  item: MenuItem;
  markdownMode: boolean;
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
    const { item, muiTheme, markdownMode } = this.props;
    const { isActive, isDisabled } = this.state;
    return (
      <IconButton
        title={item.title}
        disabled={isDisabled || markdownMode}
        onClick={this.onClick}
        iconStyle={{ color: isActive ? muiTheme!.palette!.textColor : muiTheme!.palette!.secondaryTextColor }}
      >
        {item.content}
      </IconButton>
    );
  }

}

export default muiThemeable()(MenuButton);
