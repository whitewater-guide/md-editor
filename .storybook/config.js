import React from 'react';
import { addDecorator, configure } from '@storybook/react';

addDecorator(story => (
  <div style={{ width: '100%', height: '100%' }}>
    {story()}
  </div>
));

const req = require.context('../src', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
