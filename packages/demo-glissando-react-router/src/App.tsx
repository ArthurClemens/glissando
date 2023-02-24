import 'glissando-react/glissando.css';
import './styles.css';

import { Glissando, GlissandoSlider, useGlissandoModel } from 'glissando-react';
import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import { Header } from './Header';
import { Page } from './Page';

const pageCount = 10;
const pages = [...Array(pageCount)].map((_, i) => (i + 1).toString());

export default function App() {
  const model = useGlissandoModel();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout model={model} />}>
          <Route path='/:page' element={<RoutedSlider model={model} />} />
          <Route path='/' element={<Navigate to='/1' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RoutedSlider({ model }: { model: Glissando.Model }) {
  const params = useParams();
  const currentPage = params.page;

  return (
    <GlissandoSlider model={model} locations={pages} location={currentPage}>
      {pages.map(id => (
        <Page key={id} location={id} />
      ))}
    </GlissandoSlider>
  );
}

function Layout({ model }: { model: Glissando.Model }) {
  return (
    <>
      <Header model={model} />
      <Outlet />
    </>
  );
}
