import Paper from 'material-ui/Paper';
import { Fragment } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import plugins from './config/plugins';
import schema from './config/schema';
import MenuBar from './MenuBar';

const styles = {
  view: {
  },
};

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
      state: EditorState.create({ schema, plugins }),
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
      <div style={{ width: '100%', height: '100%' }}>
        <MenuBar state={this.state.state} dispatch={this.dispatchTransaction} />
        <Paper>
          <div ref={this.createEditorView} style={styles.view} />
        </Paper>
      </div>
    );
  }
}

export default Editor;
