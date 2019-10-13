import { storiesOf } from '@storybook/react';
import React from 'react';
import MdEditor, { MdEditorProps } from './MdEditor';
import { MdEditorValue } from './types';
import { fromMarkdown } from './utils';

interface State {
  value: MdEditorValue;
}

class Controller extends React.PureComponent<
  Omit<MdEditorProps, 'value' | 'onChange'>,
  State
> {
  readonly state: State = { value: fromMarkdown('Hello **new** world!') };

  onChange = (value: MdEditorValue) => {
    this.setState({ value });
  };

  render() {
    return (
      <MdEditor
        {...this.props}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

storiesOf('MdEditor', module)
  .add('controlled', () => {
    return <Controller />;
  })
  .add('remembers editor markdown switch', () => {
    return <Controller rememberMdSwitch={true} />;
  });
