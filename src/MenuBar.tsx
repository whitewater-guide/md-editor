import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { EditorState, Transaction } from 'prosemirror-state';
import React from 'react';
import { menu } from './config';
import MenuButton from './MenuButton';
import ToolbarSeparator from './ToolbarSeparator';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    menuBar: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: palette.common.white,
      borderBottom: `1px solid ${palette.divider}`,
    },
  }),
);

interface Props {
  state: EditorState;
  dispatch: (tr: Transaction) => void;
  markdownMode: boolean;
  toolbarProps?: ToolbarProps;
}

const MenuBar: React.FC<Props> = React.memo(({
  children,
  state,
  dispatch,
  markdownMode,
  toolbarProps = {},
}) => {
  const classes = useStyles();
  return (
    <Toolbar
      {...toolbarProps}
      className={clsx(classes.menuBar, toolbarProps.className)}
    >
      {Object.entries(menu).map(([key, group]) => (
        <React.Fragment key={key}>
          {Object.entries(group).map(([key, button]) => (
            <MenuButton
              key={key}
              item={button}
              dispatch={dispatch}
              state={state}
              markdownMode={markdownMode}
            />
          ))}
          <ToolbarSeparator />
        </React.Fragment>
      ))}
      {children}
    </Toolbar>
  );
});

MenuBar.displayName = 'MenuBar';

export default MenuBar;
