import { SvgIconProps } from 'material-ui';
import SvgIcon from 'material-ui/SvgIcon';
import React from 'react';

const Heading1Icon: React.SFC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
  </SvgIcon>
);

export default Heading1Icon;
