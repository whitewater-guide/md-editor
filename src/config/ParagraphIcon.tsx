import { SvgIconProps } from 'material-ui';
import SvgIcon from 'material-ui/SvgIcon';
import React from 'react';

const ParagraphIcon: React.SFC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" />
  </SvgIcon>
);

export default ParagraphIcon;
