import m from 'mithril';

type TProps = {
  index: number;
};

export const Page: m.Component<TProps> = {
  view: ({ attrs }) => {
    const imageId = attrs.index + 1;
    const imageName = `${imageId < 10 ? '0' : ''}${imageId}`;
    const imageUrl = `https://arthurclemens.github.io/assets/mithril-slider/img/${imageName}.jpg`;
    return m(
      '.demo-page',
      m('img', {
        src: imageUrl,
      }),
    );
  },
};
