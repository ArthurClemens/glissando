import './styles.css';
import 'glissando-react/dist/glissando.min.css';

import { Glissando, GlissandoSlider, useGlissandoModel } from 'glissando-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { Header } from './Header';
import { Page } from './Page';

const pageCount = 10;

type TRoutedSlider = {
  model: Glissando.Model;
};
const RoutedSlider: FunctionComponent<TRoutedSlider> = ({ model }) => {
  const { goTo, getState, getChanges } = model;

  const history = useHistory();
  const match = useRouteMatch<{
    page: string;
  }>();
  console.log('match', match);
  const pageIndex = parseInt(match.params.page, 10);
  const [index, setIndex] = useState<number>(pageIndex);
  // const index = getState().index;

  // if (getState().index !== pageIndex) {
  //   goTo({ index: pageIndex, animate: false });
  // }
  console.log('index', index);

  const pagesList = [...Array(pageCount)].map((_, i) => i);

  useEffect(() => {
    if (pageIndex >= 0 && pageIndex < pagesList.length && pageIndex !== index) {
      setIndex(pageIndex);
      // goTo({ index: pageIndex, animate: false });
      // console.log("should push to", index);
      // history.push(`/${index}`);
    }
  }, [index, pageIndex, pagesList.length]);

  getChanges
    .map((state: Glissando.State) => {
      console.log(
        'getChanges pageIndex',
        pageIndex,
        'state.index',
        state.index,
      );
      if (state.index !== index) {
        setIndex(state.index);
      }
      return null;
    })
    .end(true);

  useEffect(() => {
    const pageIndex = parseInt(match.params.page, 10);
    if (pageIndex !== index) {
      console.log('should push to', index);
      history.push(`/${index}`);
      // goTo({ index: index, animate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <GlissandoSlider model={model}>
      {pagesList.map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Page key={i} index={i} />;
      })}
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
