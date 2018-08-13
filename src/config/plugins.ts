import { history } from 'prosemirror-history';
import keymap from './keymap';

const plugins = [
  keymap,
  history(),
];

export default plugins;
