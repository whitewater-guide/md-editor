import IconButton from 'material-ui/IconButton';
import React from 'react';
import MarkdownIcon from './icons/MarkdownIcon';

interface Props {
  active?: boolean;
  onClick?: () => void;
}

const MarkdownToggle: React.SFC<Props> = ({ active, onClick }) => (
  <IconButton
    title="Markdown"
    tooltip="Markdown"
    iconStyle={{ color: active ? '#000' : '#777' }}
    onClick={onClick}
  >
    <MarkdownIcon />
  </IconButton>
);

export default MarkdownToggle;
