import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    separator: {
      backgroundColor: 'rgba(0, 0, 0, 0.176)',
      height: spacing(4),
      marginLeft: spacing(3),
      width: '1px',
    },
  }),
);

const ToolbarSeparator: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.separator}></div>;
};

export default ToolbarSeparator;
