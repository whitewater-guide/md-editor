import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MdEditor from './MdEditor';

storiesOf('MdEditor', module)
  .addDecorator(story => (
    <div style={{ height: '100vh' }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return (
      <MdEditor />
    );
  });
