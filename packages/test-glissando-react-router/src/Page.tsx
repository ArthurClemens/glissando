import React, { FunctionComponent } from 'react';

type TProps = {
  location: string;
};

export const Page: FunctionComponent<TProps> = props => {
  const imageNum = parseInt(props.location, 10);
  const imageName = `${imageNum < 10 ? '0' : ''}${imageNum}`;
  const imageUrl = `https://arthurclemens.github.io/assets/mithril-slider/img/${imageName}.jpg`;
  return (
    <div className="demo-page">
      <img src={imageUrl} alt="" />
    </div>
  );
};
