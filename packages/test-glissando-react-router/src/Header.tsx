import { Glissando } from 'glissando-react';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

type THeaderProps = {
  model: Glissando.Model;
};

export const Header: FunctionComponent<THeaderProps> = ({ model }) => {
  const history = useHistory();

  const {
    isAnimating,
    getLocation,
    getNextLocation,
    getPreviousLocation,
  } = model;
  const location = getLocation();
  const previousLocation = getPreviousLocation();
  const nextLocation = getNextLocation();

  return (
    <header className="bar bar-nav">
      <button
        type="button"
        className="btn btn-link btn-nav pull-left"
        onClick={() => history.push(previousLocation)}
        onKeyUp={() => history.push(previousLocation)}
        tabIndex={0}
        disabled={!previousLocation || isAnimating()}
      >
        <>
          <span className="icon icon-left-nav" />
          <span>Previous</span>
        </>
      </button>
      <button
        type="button"
        className="btn btn-link btn-nav pull-right"
        onClick={() => history.push(nextLocation)}
        onKeyUp={() => history.push(nextLocation)}
        tabIndex={0}
        disabled={!nextLocation || isAnimating()}
      >
        <>
          <span>Next</span>
          <span className="icon icon-right-nav" />
        </>
      </button>
      <h1 className="title">{location}</h1>
    </header>
  );
};
