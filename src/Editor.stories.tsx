import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Editor from './Editor';

storiesOf('Editor', module)
  .addDecorator(story => (
    <div style={{ display: 'block' }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return (
      <Editor />
    );
  });
