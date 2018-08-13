import Redo from 'material-ui/svg-icons/content/redo';
import Undo from 'material-ui/svg-icons/content/undo';
import Bold from 'material-ui/svg-icons/editor/format-bold';
import Italic from 'material-ui/svg-icons/editor/format-italic';
import BulletedList from 'material-ui/svg-icons/editor/format-list-bulleted';
import OrderedList from 'material-ui/svg-icons/editor/format-list-numbered';
import Quote from 'material-ui/svg-icons/editor/format-quote';
import Underlined from 'material-ui/svg-icons/editor/format-underlined';
import Link from 'material-ui/svg-icons/editor/insert-link';
import React from 'react';
import Heading1Icon from './Heading1Icon';
import Heading2Icon from './Heading2Icon';
import ParagraphIcon from './ParagraphIcon';

export default {
  italic: <Italic />,
  bold: <Bold />,
  underline: <Underlined />,
  link: <Link />,
  paragraph: <ParagraphIcon />,
  heading1: <Heading1Icon />,
  heading2: <Heading2Icon />,
  blockquote: <Quote />,
  ordered_list: <OrderedList />,
  bullet_list: <BulletedList />,
  undo: <Undo />,
  redo: <Redo />,
};
