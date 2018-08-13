import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import React from 'react';
import MarkdownIcon from './icons/MarkdownIcon';
import MuiThemeProviderProps = __MaterialUI.Styles.MuiThemeProviderProps;

interface Props extends MuiThemeProviderProps {
  active?: boolean;
  onClick?: () => void;
}

const MarkdownToggle: React.SFC<Props> = ({ active, onClick, muiTheme }) => (
  <IconButton
    title="Markdown"
    iconStyle={{ color: active ? muiTheme!.palette!.textColor : muiTheme!.palette!.secondaryTextColor }}
    onClick={onClick}
  >
    <MarkdownIcon />
  </IconButton>
);

export default muiThemeable()(MarkdownToggle);
