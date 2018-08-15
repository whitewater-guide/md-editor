import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import React from 'react';
import icons from './icons';
import MuiThemeProviderProps = __MaterialUI.Styles.MuiThemeProviderProps;

interface Props extends MuiThemeProviderProps {
  active?: boolean;
  onClick?: () => void;
  activeIconColor?: string;
  inactiveIconColor?: string;
}

const MarkdownToggle: React.SFC<Props> = ({ active, onClick, muiTheme, activeIconColor, inactiveIconColor }) => {
  let color = active ?
    (activeIconColor || muiTheme!.palette!.textColor) :
    (inactiveIconColor || muiTheme!.palette!.secondaryTextColor);
  return (
    <IconButton
      title="Markdown"
      iconStyle={{ color: color }}
      onClick={onClick}
    >
      {icons.markdown}
    </IconButton>
  );
};

export default muiThemeable()(MarkdownToggle);
