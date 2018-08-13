import { history } from 'prosemirror-history';
import { keymap } from './keymap';

export const plugins = [
  keymap,
  history(),
];
