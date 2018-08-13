import IconButton from 'material-ui/IconButton';
import React from 'react';
import MarkdownIcon from './icons/MarkdownIcon';

interface Props {
  enabled?: boolean;
  onClick?: () => void;
}

const MarkdownToggle: React.SFC<Props> = ({ enabled, onClick }) => (
  <IconButton
    title="Markdown"
    tooltip="Markdown"
    disabled={!enabled}
    onClick={onClick}
  >
    <MarkdownIcon />
  </IconButton>
);

export default MarkdownToggle;
