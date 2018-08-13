import { defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { ChangeEvent } from 'react';
import plugins from './config/plugins';
import schema from './config/schema';
import MarkdownToggle from './MarkdownToggle';
import MenuBar from './MenuBar';
import { CombinedState } from './types';

const styles = {
  view: {
    height: '100%',
    width: '100%',
  },
  textarea: {
    height: '100%',
    width: '100%',
  },
};

interface Props {
  autoFocus?: boolean;
  onChange?: (value: CombinedState) => void;
  value?: CombinedState;
}

interface State {
  value: CombinedState | null;
}

class Editor extends React.PureComponent<Props, State> {
  private _view: EditorView | null = null;
  private _isControlled: boolean;

  constructor(props: Props) {
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

  setValue = (value: CombinedState) => {
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
    const { prosemirror, isMarkdown, markdown } = this.getValue();
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <MenuBar state={prosemirror} dispatch={this.dispatchTransaction}>
          <MarkdownToggle active={isMarkdown} onClick={this.toggleMarkdown}/>
        </MenuBar>
        <div ref={this.createEditorView} style={{ ...styles.view, display: isMarkdown ? 'none' : 'block' }} />
        <div style={{ ...styles.view, display: isMarkdown ? 'block' : 'none' }}>
          <textarea style={styles.textarea} value={markdown || undefined} onChange={this.onMarkdownChange} />
        </div>
      </div>
    );
  }
}

export default Editor;
