import './styles.css';
import 'glissando-react/dist/glissando.min.css';

import { Glissando, GlissandoSlider, useGlissandoModel } from 'glissando-react';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Header } from './Header';
import { Page } from './Page';

const pageCount = 10;
const pages = [...Array(pageCount)].map((_, i) => (i + 1).toString());

type RoutedSliderProps = {
  model: Glissando.Model;
};
const RoutedSlider = ({ model }: RoutedSliderProps) => {
  const match = useRouteMatch<{
    page: string;
  }>();

  const currentPage = match.params.page;

  return (
    <GlissandoSlider model={model} locations={pages} location={currentPage}>
      {pages.map(id => (
        <Page key={id} location={id} />
      ))}
    </GlissandoSlider>
  );
};

export default function App() {
  const model = useGlissandoModel();

  return (
    <>
      <Header model={model} />
      <Switch>
        <Route path="/:page">
          <RoutedSlider model={model} />
        </Route>
      </Switch>
    </>
  );
}
