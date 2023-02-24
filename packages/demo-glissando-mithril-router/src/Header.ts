import type { Glissando } from 'glissando-mithril';
import m from 'mithril';

type TProps = {
  model: Glissando.Model;
};

export const Header: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { model } = attrs;
    const { isAnimating, getLocation, getNextLocation, getPreviousLocation } =
      model;
    const location = getLocation();
    const previousLocation = getPreviousLocation();
    const nextLocation = getNextLocation();

    const goPrevious = () => {
      if (previousLocation) {
        m.route.set(previousLocation);
      }
    };
    const goNext = () => {
      if (nextLocation) {
        m.route.set(nextLocation);
      }
    };

    return m(
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
            m('span', 'Previous'),
          ],
        ),
        m(
          'button',
          {
            type: 'button',
            className: 'btn btn-link btn-nav pull-right',
            tabIndex: 0,
            disabled: !nextLocation || isAnimating(),
            onclick: goNext,
            onkeyup: goNext,
          },
          [
            m('span', 'Next'),
            m('span', {
              className: 'icon icon-right-nav',
            }),
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
    );
  },
};
