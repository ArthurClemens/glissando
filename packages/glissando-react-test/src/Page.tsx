import React, { FunctionComponent } from 'react';

type TProps = {
  index: number;
};

export const Page: FunctionComponent<TProps> = props => {
  const imageId = props.index + 1;
  const imageName = `${imageId < 10 ? '0' : ''}${imageId}`;
  const imageUrl = `https://arthurclemens.github.io/assets/mithril-slider/img/${imageName}.jpg`;
  return (
    <div className="demo-page">
      <img src={imageUrl} alt="" />
    </div>
  );
};
