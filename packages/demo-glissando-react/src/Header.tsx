import type { Glissando } from 'glissando';
import React from 'react';
import { TAppModel } from './AppModel';

type Props = {
  model: Glissando.Model;
  appModel: TAppModel;
};
export const Header = ({ model, appModel }: Props) => {
  const {
    getState,
    previous,
    next,
    hasPrevious,
    hasNext,
    goTo,
    isAnimating,
  } = model;
  const state = getState();
  const index = state.index;
  const appIsRtl = appModel.getState().isRtl;
  const appIsAnimated = appModel.getState().isAnimated;
  const appPageCount = appModel.getState().count;

  return (
    <>
      <header className='bar nav-bar meta-controls'>
        <div className='ui toggle checkbox'>
          <input
            type='checkbox'
            name='rtl'
            checked={appIsRtl}
            onChange={() => {
              appModel.setIsRtl(!appIsRtl);
            }}
          />
          <label>RTL</label>
        </div>
        <div className='ui toggle checkbox'>
          <input
            type='checkbox'
            name='animated'
            checked={appIsAnimated}
            onChange={() => {
              appModel.setIsAnimated(!appIsAnimated);
            }}
          />
          <label>Animated</label>
        </div>
        <div className='spacer' />
        <div
          className={`ui button${appPageCount === 1 ? ' disabled' : ''}`}
          onClick={() => appModel.setCount(appPageCount - 1)}
        >
          Remove page
        </div>
        <div
          className={`ui button${appPageCount === 10 ? ' disabled' : ''}`}
          onClick={() => appModel.setCount(appPageCount + 1)}
        >
          Add page
        </div>
      </header>
      <header className='bar nav-bar page-controls' dir={appIsRtl ? 'rtl' : ''}>
        <div
          className={`ui button${
            !hasPrevious() || isAnimating() ? ' disabled' : ''
          }`}
          onClick={() => previous({ animate: appIsAnimated })}
        >
          Previous
        </div>
        <div className='ui compact menu'>
          <div className='ui simple dropdown item'>
            {index + 1}
            <i className='dropdown icon' />
            <div className='menu'>
              {appModel.getState().selectIndices.map((_index, i) => (
                <div
                  key={i}
                  className={`item${index === i ? ' disabled' : ''}`}
                  onClick={() => {
                    goTo({
                      index: i,
                      animate: appIsAnimated,
                    });
                  }}
                >{`Go to page ${i + 1}`}</div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`ui button${
            !hasNext() || isAnimating() ? ' disabled' : ''
          }`}
          onClick={() => next({ animate: appIsAnimated })}
        >
          Next
        </div>
      </header>
    </>
  );
};
