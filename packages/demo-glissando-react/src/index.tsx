import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}
