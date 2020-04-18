import 'glissando-mithril/dist/glissando.min.css';
import './styles.css';

import m from 'mithril';

import { AppPage } from './AppPage';

const App = () => {
  return {
    view: () => m(AppPage),
  };
};

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
  m.mount(rootElement, App);
}
