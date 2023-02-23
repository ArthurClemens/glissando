import 'glissando-mithril/glissando.min.css';
import './styles.css';

import m from 'mithril';

import { App } from './App';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
  m.route(document.body, '/', {
    '/': {
      onmatch() {
        m.route.set('/1');
      },
    },
    '/:page': App,
  });
}
