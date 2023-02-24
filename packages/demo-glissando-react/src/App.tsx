/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';
import 'glissando-react/glissando.css';

import { GlissandoSlider, useGlissandoModel } from 'glissando-react';
import React from 'react';

import { Page } from './Page';
import { TAppState, useAppModel } from './useAppModel';
import { Header } from './Header';

export const App = () => {
  const model = useGlissandoModel();

  const appModel = useAppModel({
    isVisible: true,
    isAnimated: true,
    isRtl: false,
    count: 5,
    selectIndices: [] as number[],
  });

  appModel.getChanges
    .map((state: TAppState) => {
      appModel.setCount(state.count);
      return null;
    })
    .end(true); // prevent accumulation of stream subscriptions

  // Create a list of pages
  const pageCount = appModel.getState().count;
  const pagesList = [...Array(pageCount)].map((_, i) => i);

  return (
    <div className='demo-container'>
      {appModel.getState().isVisible && (
        <div dir={appModel.getState().isRtl ? 'rtl' : ''}>
          <Header model={model} appModel={appModel} />
          <GlissandoSlider model={model}>
            {pagesList.map(index => (
              <Page key={index} index={index} />
            ))}
          </GlissandoSlider>
        </div>
      )}
    </div>
  );
};
