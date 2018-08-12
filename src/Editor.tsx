import { Fragment } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import schema from './config/schema';
import MenuBar from './MenuBar';

interface Props {
  autoFocus?: boolean;
  onChange?: (content: Fragment) => void;
}

interface State {
  state: EditorState;
}

class Editor extends React.PureComponent<Props, State> {
  private _view: EditorView | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      state: EditorState.create({ schema }),
    };
  }

  createEditorView = (node: HTMLDivElement | null) => {
    if (!this._view && node) {
      this._view = new EditorView(node, {
        state: this.state.state,
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
    const state = this._view.state.apply(transaction);
    this._view.updateState(state);
    this.setState({ state });
    if (this.props.onChange) {
      this.props.onChange(state.doc.content);
    }
  };

  render() {
    return (
      <div>
        <MenuBar state={this.state.state} dispatch={this.dispatchTransaction} />
        <div ref={this.createEditorView} />
      </div>
    );
  }
}

export default Editor;
