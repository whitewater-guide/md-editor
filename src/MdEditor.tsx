import { ToolbarProps } from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
import React, { ChangeEvent } from 'react';
import { plugins, schema } from './config';
import MarkdownToggle from './MarkdownToggle';
import classes from './MdEditor.module.css';
import MenuBar from './MenuBar';
import { MdEditorValue } from './types';

const MD_COOKIE = 'md_editor_markdown';

export interface MdEditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value?: MdEditorValue;
  className?: string;
  toolbarProps?: ToolbarProps;
  rememberMdSwitch?: boolean;
  // Formik compatibility
  name?: string;
  onChangeCompat?: (
    e: React.ChangeEvent<{ name?: string; value: MdEditorValue }>,
  ) => void;
}

interface State {
  value: MdEditorValue | null;
}

export class MdEditor extends React.PureComponent<MdEditorProps, State> {
  private _view: EditorView | null = null;
  private _isControlled: boolean;

  constructor(props: MdEditorProps) {
    super(props);
    this._isControlled =
      props.value !== undefined && (!!props.onChange || !!props.onChangeCompat);
    this.state = this._isControlled
      ? { value: null }
      : {
          value: {
            isMarkdown: false,
            markdown: null,
            prosemirror: EditorState.create({ schema, plugins }),
          },
        };
  }

  componentDidMount() {
    const { rememberMdSwitch } = this.props;
    if (!rememberMdSwitch) {
      return;
    }
    const currentMd = this.getValue().isMarkdown;
    const savedMd = !!Cookies.get(MD_COOKIE);
    if (currentMd !== savedMd) {
      this.toggleMarkdown();
    }
  }

  componentDidUpdate() {
    if (this._view) {
      this._view.updateState(this.getValue().prosemirror);
    }
  }

  getValue = () => (this._isControlled ? this.props.value! : this.state.value!);

  setValue = (value: MdEditorValue) => {
    if (this._isControlled) {
      const { name, onChange, onChangeCompat } = this.props;
      if (onChange) {
        onChange(value);
      } else if (onChangeCompat) {
        const event: any = {
          target: { name, value },
        };
        onChangeCompat(event);
      }
    } else {
      this.setState({ value });
    }
  };

  createEditorView = (node: HTMLDivElement | null) => {
    if (!this._view && node) {
      this._view = new EditorView(node, {
        state: this.getValue().prosemirror,
        dispatchTransaction: this.dispatchTransaction,
        attributes: {
          class: classes.ProseMirrorView,
        },
      });

      if (this.props.autoFocus) {
        this._view.focus();
      }
    }
  };

  dispatchTransaction = (transaction: Transaction<any>) => {
    const { prosemirror } = this.getValue();
    const newProsemirror = prosemirror.apply(transaction);
    const newValue = {
      prosemirror: newProsemirror,
      isMarkdown: false,
      markdown: null,
    };
    this.setValue(newValue);
  };

  toggleMarkdown = () => {
    const { isMarkdown, markdown, prosemirror } = this.getValue();
    const newValue = {
      isMarkdown: !isMarkdown,
      markdown: isMarkdown
        ? null
        : defaultMarkdownSerializer.serialize(prosemirror.doc),
      prosemirror: isMarkdown
        ? EditorState.create({
            schema,
            plugins,
            doc: defaultMarkdownParser.parse(markdown!),
          })
        : prosemirror,
    };
    this.setValue(newValue);
    if (this.props.rememberMdSwitch) {
      if (isMarkdown) {
        Cookies.remove(MD_COOKIE);
      } else {
        Cookies.set(MD_COOKIE, '1');
      }
    }
  };

  onMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { prosemirror } = this.getValue();
    this.setValue({
      isMarkdown: true,
      markdown: e.target.value,
      prosemirror,
    });
  };

  render() {
    const { className, toolbarProps } = this.props;
    const { prosemirror, isMarkdown, markdown } = this.getValue();
    const pmClass = clsx({
      [classes.ProseMirrorContainer]: true,
      [classes.hidden]: isMarkdown,
    });
    const mdClass = clsx({
      [classes.MarkdownContainer]: true,
      [classes.hidden]: !isMarkdown,
    });
    return (
      <div className={clsx(classes.container, className)}>
        <MenuBar
          state={prosemirror}
          dispatch={this.dispatchTransaction}
          markdownMode={isMarkdown}
          toolbarProps={toolbarProps}
        >
          <MarkdownToggle active={isMarkdown} onClick={this.toggleMarkdown} />
        </MenuBar>
        <div ref={this.createEditorView} className={pmClass} spellCheck />
        <div className={mdClass}>
          <textarea
            spellCheck
            className={classes.MarkdownTextarea}
            value={markdown || undefined}
            onChange={this.onMarkdownChange}
          />
        </div>
      </div>
    );
  }
}

export default MdEditor;
