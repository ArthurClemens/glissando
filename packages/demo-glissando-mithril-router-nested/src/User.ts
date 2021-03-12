import m from 'mithril';

type TProps = {
  user: string;
};

export const User: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { user } = attrs;
    return m(
      '.content',
      user &&
        m('.user-page', [
          m('.user-first-letter', user[0]),
          m(
            m.route.Link,
            {
              className: 'user-details-link',
              href: `/users/${user}/details`,
            },
            `More about ${user}`,
          ),
        ]),
    );
  },
};
