import m from 'mithril';

type TProps = {
  location: string;
};

export const Page: m.Component<TProps> = {
  view: ({ attrs }) => {
    const imageNum = parseInt(attrs.location, 10);
    const imageName = `${imageNum < 10 ? '0' : ''}${imageNum}`;
    const imageUrl = `https://arthurclemens.github.io/assets/mithril-slider/img/${imageName}.jpg`;
    return m(
      '.demo-page',
      m('img', {
        src: imageUrl,
      }),
    );
  },
};
