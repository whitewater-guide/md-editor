import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import icons from './icons';

interface Props {
  active?: boolean;
  onClick?: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    inactive: {
      color: theme.palette.text.secondary,
    },
    active: {
      color: theme.palette.text.primary,
    },
  }),
);

const MarkdownToggle: React.FC<Props> = ({ active, onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="Markdown"
      className={active ? classes.active : classes.inactive}
      onClick={onClick}
    >
      {icons.markdown}
    </IconButton>
  );
};

export default MarkdownToggle;
