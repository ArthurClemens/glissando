import React, { FunctionComponent } from "react";
import { Glissando } from "glissando-react";

type THeaderProps = {
  model: Glissando.Model;
};

export const Header: FunctionComponent<THeaderProps> = ({ model }) => {
  const { getState, previous, next, hasPrevious, hasNext, isAnimating } = model;

  const state = getState();
  const index = state.index;

  return (
    <header className="bar bar-nav">
      <button
        className="btn btn-link btn-nav pull-left"
        onClick={() => previous()}
        disabled={!hasPrevious() || isAnimating()}
      >
        <>
          <span className="icon icon-left-nav" />
          <span>Previous</span>
        </>
      </button>
      <button
        className="btn btn-link btn-nav pull-right"
        onClick={() => next()}
        disabled={!hasNext() || isAnimating()}
      >
        <>
          <span>Next</span>
          <span className="icon icon-right-nav" />
        </>
      </button>
      <h1 className="title">{index}</h1>
    </header>
  );
};
