import m from 'mithril';

type TProps = {
  users: string[];
};

export const Listing: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { users } = attrs;
    return m(
      '.content',
      m(
        'ul.table-view',
        users.map((name: string) => {
          const personRoute = `/users/${name}`;
          return m(
            'li.table-view-cell media',
            m(
              m.route.Link,
              {
                href: personRoute,
                class: 'navigate-right',
              },
              name,
            ),
          );
        }),
      ),
    );
  },
};
