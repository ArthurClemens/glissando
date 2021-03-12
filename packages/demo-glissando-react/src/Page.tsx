import React from 'react';

type Props = {
  index: number;
};

export const Page = ({ index }: Props) => {
  const imageId = index + 1;
  const imageName = `${imageId < 10 ? '0' : ''}${imageId}`;
  const imageUrl = `https://arthurclemens.github.io/assets/mithril-slider/img/${imageName}.jpg`;
  return (
    <div className="demo-page">
      <img src={imageUrl} alt="" />
    </div>
  );
};
