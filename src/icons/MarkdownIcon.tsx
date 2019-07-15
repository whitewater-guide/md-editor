import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

const MarkdownIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M2,16V8H4L7,11L10,8H12V16H10V10.83L7,13.83L4,10.83V16H2M16,8H19V12H21.5L17.5,16.5L13.5,12H16V8Z" />
  </SvgIcon>
);

export default MarkdownIcon;
