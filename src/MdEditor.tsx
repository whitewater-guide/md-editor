import classNames from 'classnames';
import { defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
import React, { ChangeEvent, CSSProperties } from 'react';
import { plugins, schema } from './config';
import MarkdownToggle from './MarkdownToggle';
import classes from './MdEditor.module.css';
import MenuBar from './MenuBar';
import { MdEditorValue } from './types';
import ToolbarProps = __MaterialUI.Toolbar.ToolbarProps;

export interface MdEditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value?: MdEditorValue;
  containerStyle?: CSSProperties;
  toolbarProps?: ToolbarProps;
}

interface State {
  value: MdEditorValue | null;
}

export class MdEditor extends React.PureComponent<MdEditorProps, State> {
  private _view: EditorView | null = null;
  private _isControlled: boolean;

  constructor(props: MdEditorProps) {
    super(props);
    this._isControlled = !!props.value && !!props.onChange;
    this.state = this._isControlled ?
      { value: null } :
      {
        value: {
          isMarkdown: false,
          markdown: null,
          prosemirror: EditorState.create({ schema, plugins }),
        },
      };
  }

  getValue = () => this._isControlled ? this.props.value! : this.state.value!;

  setValue = (value: MdEditorValue) => {
    if (this._isControlled) {
      this.props.onChange!(value);
    } else {
      this.setState({ value });
    }
  };

  createEditorView = (node: HTMLDivElement | null) => {
    if (!this._view && node) {
      this._view = new EditorView(node, {
        state: this.getValue().prosemirror,
        dispatchTransaction: this.dispatchTransaction,
      });

      if (this.props.autoFocus) {
        this._view.focus();
      }
    }
  };

  dispatchTransaction = (transaction: Transaction<any>) => {
    if (!this._view) {
      return;
    }
    const prosemirror = this._view.state.apply(transaction);
    this._view.updateState(prosemirror);
    const newValue = { prosemirror, isMarkdown: false, markdown: null };
    this.setValue(newValue);
  };

  toggleMarkdown = () => {
    const { isMarkdown, markdown, prosemirror } = this.getValue();
    const newValue = {
      isMarkdown: !isMarkdown,
      markdown: isMarkdown ? null : defaultMarkdownSerializer.serialize(prosemirror.doc),
      prosemirror: isMarkdown ?
        EditorState.create({ schema, plugins, doc: defaultMarkdownParser.parse(markdown!) }) :
        prosemirror,
    };
    if (this._view) {
      this._view.updateState(newValue.prosemirror);
    }
    this.setValue(newValue);
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
    const { containerStyle, toolbarProps } = this.props;
    const { prosemirror, isMarkdown, markdown } = this.getValue();
    const pmClass = classNames({ [classes.ProseMirror]: true, [classes.hidden]: isMarkdown });
    const textareaClass = classNames({ [classes.ProseMirror]: true, [classes.Markdown]: true });
    const mdClass = classNames({
      [classes.ProseMirror]: true,
      [classes.Markdown]: true,
      [classes.hidden]: !isMarkdown,
    });
    return (
      <div style={{ width: '100%', height: '100%', ...containerStyle }}>
        <MenuBar
          state={prosemirror}
          dispatch={this.dispatchTransaction}
          markdownMode={isMarkdown}
          toolbarProps={toolbarProps}
        >
          <MarkdownToggle active={isMarkdown} onClick={this.toggleMarkdown}/>
        </MenuBar>
        <div ref={this.createEditorView} className={pmClass} />
        <div className={mdClass}>
          <textarea
            className={textareaClass}
            value={markdown || undefined}
            onChange={this.onMarkdownChange}
          />
        </div>
      </div>
    );
  }
}

export default MdEditor;