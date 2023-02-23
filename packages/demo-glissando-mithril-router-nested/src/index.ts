import 'glissando-mithril/glissando.min.css';
import './styles.css';

import m from 'mithril';

import { App } from './App';

// m.route.prefix = '';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
  m.route(document.body, '/users', {
    '/users': App,
    '/users/:user': App,
    '/users/:user/details': App,
  });
}
