import {
  baseKeymap,
  chainCommands,
  exitCode,
  joinDown,
  joinUp,
  lift,
  selectParentNode,
  setBlockType,
  toggleMark,
  wrapIn,
} from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { keymap as makeKeymap } from 'prosemirror-keymap';
import {
  liftListItem,
  sinkListItem,
  splitListItem,
  wrapInList,
} from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { Dispatch } from '../types';
import { schema } from './schema';

const insertBreak = (state: EditorState, dispatch: Dispatch) => {
  const br = schema.nodes.hard_break.create();
  dispatch(state.tr.replaceSelectionWith(br).scrollIntoView());
  return true;
};

const insertRule = (state: EditorState, dispatch: Dispatch) => {
  const hr = schema.nodes.horizontal_rule.create();
  dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView());
  return true;
};

const keys: { [key: string]: any } = {
  'Mod-z': undo,
  'Mod-y': redo,
  'Shift-Mod-z': redo,
  'Alt-ArrowUp': joinUp,
  'Alt-ArrowDown': joinDown,
  'Mod-BracketLeft': lift,
  Escape: selectParentNode,
  'Mod-b': toggleMark(schema.marks.strong),
  'Mod-i': toggleMark(schema.marks.em),
  'Shift-Ctrl-8': wrapInList(schema.nodes.bullet_list),
  'Shift-Ctrl-9': wrapInList(schema.nodes.ordered_list),
  'Ctrl->': wrapIn(schema.nodes.blockquote),
  'Mod-Enter': chainCommands(exitCode, insertBreak),
  'Shift-Enter': chainCommands(exitCode, insertBreak),
  'Ctrl-Enter': chainCommands(exitCode, insertBreak), // mac-only?
  Enter: splitListItem(schema.nodes.list_item),
  'Mod-[': liftListItem(schema.nodes.list_item),
  'Mod-]': sinkListItem(schema.nodes.list_item),
  'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
  'Shift-Ctrl-1': setBlockType(schema.nodes.heading, { level: 1 }),
  'Shift-Ctrl-2': setBlockType(schema.nodes.heading, { level: 2 }),
  'Mod-_': insertRule,
};

Object.keys(baseKeymap).forEach((key) => {
  keys[key] = !!keys[key]
    ? chainCommands(keys[key], baseKeymap[key])
    : baseKeymap[key];
});

export const keymap = makeKeymap(keys);
