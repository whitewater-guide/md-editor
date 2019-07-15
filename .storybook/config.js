import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { Paper } from '@material-ui/core';

addDecorator((story) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}
  >
    <Paper style={{ margin: 32, minHeight: 600 }}>{story()}</Paper>
  </div>
));

const req = require.context('../src', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
