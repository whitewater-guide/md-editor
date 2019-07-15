import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MdEditor from './MdEditor';
import { MdEditorValue } from './types';
import { fromMarkdown } from './utils';

interface State {
  value: MdEditorValue;
}

class Controller extends React.PureComponent<{}, State> {
  readonly state: State = { value: fromMarkdown('Hello **new** world!') };

  onChange = (value: MdEditorValue) => {
    this.setState({ value });
  };

  render() {
    return <MdEditor value={this.state.value} onChange={this.onChange} />;
  }
}

storiesOf('MdEditor', module)
  .addDecorator((story) => <div style={{ height: '100%' }}>{story()}</div>)
  .add('default', () => {
    return <MdEditor />;
  })
  .add('controlled', () => {
    return <Controller />;
  });
