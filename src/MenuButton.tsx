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
  activeIconColor?: string;
  inactiveIconColor?: string;
}

interface State {
  isDisabled: boolean;
  iconStyle: React.CSSProperties;
}

class MenuButton extends React.PureComponent<Props> {
  static getDerivedStateFromProps = (props: Props): State => {
    const { item, state, muiTheme, activeIconColor, inactiveIconColor } = props;
    const activeColor = activeIconColor || muiTheme!.palette!.textColor;
    const inactiveColor = inactiveIconColor || muiTheme!.palette!.secondaryTextColor;
    const isActive = !!item.active && item.active(state);
    const iconStyle = { color: isActive ? activeColor : inactiveColor };
    return {
      isDisabled: !!item.enable && !item.enable(state),
      iconStyle,
    };
  };

  readonly state: State = MenuButton.getDerivedStateFromProps(this.props);

  onClick = (e: MouseEvent) => {
    const { state, dispatch, item } = this.props;
    e.preventDefault();
    item.run(state, dispatch);
  };

  render() {
    const { item, markdownMode } = this.props;
    const { isDisabled, iconStyle } = this.state;
    return (
      <IconButton
        title={item.title}
        disabled={isDisabled || markdownMode}
        onClick={this.onClick}
        iconStyle={iconStyle}
      >
        {item.content}
      </IconButton>
    );
  }

}

export default muiThemeable()(MenuButton);
