import React from 'react';

type Props = {
  location: string;
};

export const Page = ({ location }: Props) => {
  const imageNum = parseInt(location, 10);
  const imageName = `${imageNum < 10 ? '0' : ''}${imageNum}`;
  const imageUrl = `https://arthurclemens.github.io/assets/mithril-slider/img/${imageName}.jpg`;

  return (
    <div className="demo-page">
      <img src={imageUrl} alt="" />
    </div>
  );
};
