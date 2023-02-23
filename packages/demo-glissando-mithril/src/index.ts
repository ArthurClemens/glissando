import 'glissando-mithril/glissando.css';
import './styles.css';

import m from 'mithril';

import { App } from './App';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
  m.mount(rootElement, App);
}
