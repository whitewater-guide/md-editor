import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { EditorState, Transaction } from 'prosemirror-state';
import React, { MouseEvent, useCallback } from 'react';
import { MenuItem } from './config';

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

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  item: MenuItem;
  markdownMode: boolean;
}

const MenuButton: React.FC<Props> = (props) => {
  const { state, dispatch, item, markdownMode } = props;
  const isActive = !!item.active && item.active(state);
  const isDisabled = !!item.enable && !item.enable(state);
  const classes = useStyles();
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      item.run(state, dispatch);
    },
    [item, state, dispatch],
  );
  return (
    <IconButton
      aria-label={item.title}
      disabled={isDisabled || markdownMode}
      onClick={onClick}
      className={isActive ? classes.active : classes.inactive}
    >
      {item.content}
    </IconButton>
  );
};

export default MenuButton;
