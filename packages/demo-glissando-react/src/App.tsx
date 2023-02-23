/* eslint-disable jsx-a11y/label-has-associated-control */
import './styles.css';
import 'glissando-react/glissando.css';

import { GlissandoSlider, useGlissandoModel } from 'glissando-react';
import React from 'react';

import { Page } from './Page';
import { TAppState, useAppModel } from './useAppModel';

export const App = () => {
  const model = useGlissandoModel();

  const {
    getState,
    // getChanges,
    previous,
    next,
    goTo,
    hasPrevious,
    hasNext,
    isAnimating,
  } = model;

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

  // getChanges
  //   .map((state: Glissando.State) => {
  //     return null;
  //   })
  //   .end(true); // prevent accumulation of stream subscriptions

  // Create a list of pages
  const pageCount = appModel.getState().count;
  const pagesList = [...Array(pageCount)].map((_, i) => i);

  return (
    <div className="demo-container">
      <div className="demo-meta-controls">
        <div>
          <input
            id="visible"
            type="checkbox"
            value="1"
            checked={appModel.getState().isVisible}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              appModel.setIsVisible(e.target.checked);
            }}
          />
          <label htmlFor="visible">Show</label>
        </div>
        <div>
          <input
            id="rtl"
            type="checkbox"
            value="1"
            checked={appModel.getState().isRtl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              appModel.setIsRtl(e.target.checked);
            }}
          />
          <label htmlFor="rtl">Right to left</label>
        </div>
        <div>
          <input
            id="animate"
            type="checkbox"
            value="1"
            checked={appModel.getState().isAnimated}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              appModel.setIsAnimated(e.target.checked);
            }}
          />
          <label htmlFor="animate">Animate</label>
        </div>
      </div>
      {appModel.getState().isVisible && (
        <div dir={appModel.getState().isRtl ? 'rtl' : ''}>
          <div className="demo-controls">
            <button
              type="button"
              onClick={() =>
                previous({ animate: appModel.getState().isAnimated })
              }
              disabled={!hasPrevious() || isAnimating()}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => next({ animate: appModel.getState().isAnimated })}
              disabled={!hasNext() || isAnimating()}
            >
              Next
            </button>
            <select
              disabled={getState().isAnimating || getState().count < 2}
              value={getState().index}
              onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                e.persist();
                const element = e.target as HTMLInputElement;
                if (element) {
                  goTo({
                    index: parseInt(element.value, 10),
                    animate: appModel.getState().isAnimated,
                  });
                }
              }}
            >
              {appModel.getState().selectIndices.map((index, i) => (
                <option key={index} value={i}>
                  {`Go to page ${i + 1}`}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => appModel.setCount(appModel.getState().count - 1)}
              disabled={appModel.getState().count === 1 || isAnimating()}
            >
              Remove page
            </button>
            <button
              type="button"
              onClick={() => appModel.setCount(appModel.getState().count + 1)}
              disabled={appModel.getState().count === 10 || isAnimating()}
            >
              Add page
            </button>
          </div>
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
