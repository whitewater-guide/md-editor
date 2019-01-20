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
import { MdEditorValue, ToolbarButtonProps } from './types';
import ToolbarProps = __MaterialUI.Toolbar.ToolbarProps;

export interface MdEditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value?: MdEditorValue;
  containerStyle?: CSSProperties;
  toolbarProps?: ToolbarProps;
  toolbarButtonProps?: ToolbarButtonProps;
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

  componentDidUpdate() {
    if (this._view) {
      this._view.updateState(this.getValue().prosemirror);
    }
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
        attributes: {
          class: classNames([classes.ProseMirrorView]),
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
    const newValue = { prosemirror: newProsemirror, isMarkdown: false, markdown: null };
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
    const { containerStyle, toolbarProps, toolbarButtonProps } = this.props;
    const { prosemirror, isMarkdown, markdown } = this.getValue();
    const pmClass = classNames({ [classes.ProseMirrorContainer]: true, [classes.hidden]: isMarkdown });
    const mdClass = classNames({ [classes.MarkdownContainer]: true, [classes.hidden]: !isMarkdown });
    return (
      <div className={classNames([classes.container])} style={containerStyle}>
        <MenuBar
          state={prosemirror}
          dispatch={this.dispatchTransaction}
          markdownMode={isMarkdown}
          toolbarProps={toolbarProps}
          toolbarButtonProps={toolbarButtonProps}
        >
          <MarkdownToggle {...toolbarButtonProps} active={isMarkdown} onClick={this.toggleMarkdown}/>
        </MenuBar>
        <div ref={this.createEditorView} className={pmClass} spellCheck />
        <div className={mdClass}>
          <textarea
            spellCheck
            className={classNames([classes.MarkdownTextarea])}
            value={markdown || undefined}
            onChange={this.onMarkdownChange}
          />
        </div>
      </div>
    );
  }
}

export default MdEditor;
