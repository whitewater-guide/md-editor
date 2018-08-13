import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import React from 'react';
import icons from './icons';
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
    {icons.markdown}
  </IconButton>
);

export default muiThemeable()(MarkdownToggle);
