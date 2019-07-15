import Redo from '@material-ui/icons/Redo';
import Undo from '@material-ui/icons/Undo';
import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import BulletedList from '@material-ui/icons/FormatListBulleted';
import OrderedList from '@material-ui/icons/FormatListNumbered';
import Quote from '@material-ui/icons/FormatQuote';
import Link from '@material-ui/icons/Link';
import React from 'react';
import Heading1Icon from './Heading1Icon';
import Heading2Icon from './Heading2Icon';
import Markdown from './MarkdownIcon';
import ParagraphIcon from './ParagraphIcon';

export default {
  italic: <Italic />,
  bold: <Bold />,
  link: <Link />,
  paragraph: <ParagraphIcon />,
  heading1: <Heading1Icon />,
  heading2: <Heading2Icon />,
  blockquote: <Quote />,
  ordered_list: <OrderedList />,
  bullet_list: <BulletedList />,
  undo: <Undo />,
  redo: <Redo />,
  markdown: <Markdown />,
};
