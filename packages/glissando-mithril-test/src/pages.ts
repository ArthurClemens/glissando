import m from 'mithril';

export const Page = (title: string) => ({
  view: () => {
    return m('.demo-page', m('h1', title));
  },
});

type TBasePage = {
  num: string;
};

const BasePage: m.Component<TBasePage> = {
  view: ({ attrs }) => {
    return m('.demo-page', [
      m('.top', `Page ${attrs.num}`),
      m('img', {
        src: `http://arthurclemens.github.io/assets/mithril-slider/img/${attrs.num}.jpg`,
        width: '750',
      }),
    ]);
  },
};

export const Page1 = {
  view: () =>
    m(BasePage, {
      num: '01',
    }),
};
export const Page2 = {
  view: () =>
    m(BasePage, {
      num: '02',
    }),
};
export const Page3 = {
  view: () =>
    m(BasePage, {
      num: '03',
    }),
};
export const Page4 = {
  view: () =>
    m(BasePage, {
      num: '04',
    }),
};
export const Page5 = {
  view: () =>
    m(BasePage, {
      num: '05',
    }),
};
export const Page6 = {
  view: () =>
    m(BasePage, {
      num: '06',
    }),
};
export const Page7 = {
  view: () =>
    m(BasePage, {
      num: '07',
    }),
};
export const Page8 = {
  view: () =>
    m(BasePage, {
      num: '08',
    }),
};
export const Page9 = {
  view: () =>
    m(BasePage, {
      num: '09',
    }),
};
export const Page10 = {
  view: () =>
    m(BasePage, {
      num: '10',
    }),
};
