import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

addDecorator(story => (
  <MuiThemeProvider>
    <div style={{ width: '100%', height: '100%' }}>
      {story()}
    </div>
  </MuiThemeProvider>
));

const req = require.context('../src', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
