import type { Glissando } from 'glissando-mithril';
import m from 'mithril';

type TProps = {
  model: Glissando.Model;
};

export const Header: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { model } = attrs;
    const { isAnimating, getLocation, getPreviousLocation } = model;
    const location = getLocation();
    const previousLocation = getPreviousLocation();

    const goPrevious = () => {
      if (previousLocation) {
        m.route.set(previousLocation);
      }
    };

    return m.fragment({}, [
      m(
        'header',
        {
          className: 'bar bar-nav',
        },
        [
          m(
            'button',
            {
              type: 'button',
              className: 'btn btn-link btn-nav pull-left',
              tabIndex: 0,
              disabled: !previousLocation || isAnimating(),
              onclick: goPrevious,
              onkeyup: goPrevious,
            },
            [
              m('span', {
                className: 'icon icon-left-nav',
              }),
              m('span', 'Back'),
            ],
          ),
          m(
            'h1',
            {
              className: 'title',
            },
            location,
          ),
        ],
      ),
      m('.status', [
        m(
          'div',
          `locations: ${JSON.stringify(model.getState().locations || [])}`,
        ),
        m('div', `location: "${model.getState().location}"`),
      ]),
    ]);
  },
};
