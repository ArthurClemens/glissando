import { Glissando } from 'glissando-mithril';
import m from 'mithril';

import { TAppModel } from './AppModel';

type TProps = {
  model: Glissando.Model;
  appModel: TAppModel;
};

export const Header: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { appModel, model } = attrs;

    const {
      getState,
      previous,
      next,
      goTo,
      hasPrevious,
      hasNext,
      isAnimating,
    } = model;

    return m('header', [
      m('.row.row-meta', [
        m('div', [
          m('input', {
            id: 'rtl',
            type: 'checkbox',
            value: '1',
            checked: appModel.getState().isRtl,
            onclick: (e: Event) => {
              appModel.setIsRtl((e.target as HTMLInputElement).checked);
            },
          }),
          m(
            'label',
            {
              for: 'rtl',
            },
            'Right to left',
          ),
        ]),
        m('div', [
          m('input', {
            id: 'animate',
            type: 'checkbox',
            value: '1',
            checked: appModel.getState().isAnimated,
            onclick: (e: Event) => {
              appModel.setIsAnimated((e.target as HTMLInputElement).checked);
            },
          }),
          m(
            'label',
            {
              for: 'animate',
            },
            'Animate',
          ),
        ]),
      ]),
      m('.row.row-controls', [
        m(
          'button',
          {
            onclick: () =>
              previous({ animate: appModel.getState().isAnimated }),
            disabled: !hasPrevious() || isAnimating(),
          },
          'Previous',
        ),
        m(
          'button',
          {
            onclick: () => next({ animate: appModel.getState().isAnimated }),
            disabled: !hasNext() || isAnimating(),
          },
          'Next',
        ),
        m(
          'select',
          {
            disabled: getState().isAnimating || getState().count < 2,
            value: getState().index,
            onchange: (e: InputEvent) => {
              const element = e.target as HTMLInputElement;
              if (element) {
                goTo({
                  index: parseInt(element.value, 10),
                  animate: appModel.getState().isAnimated,
                });
              }
            },
          },
          appModel.getState().selectIndices.map((_index, i) =>
            m(
              'option',
              {
                key: i,
                value: i,
              },
              `Go to page ${i + 1}`,
            ),
          ),
        ),
        m(
          'button',
          {
            onclick: () => {
              appModel.setCount(appModel.getState().count - 1);
            },
            disabled: appModel.getState().count === 1 || isAnimating(),
          },
          'Remove page',
        ),
        m(
          'button',
          {
            onclick: () => {
              appModel.setCount(appModel.getState().count + 1);
            },
            disabled: appModel.getState().count === 10 || isAnimating(),
          },
          'Add page',
        ),
      ]),
    ]);
  },
};
