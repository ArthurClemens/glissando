import { Glissando } from 'glissando';
/**
 * Wrapper around GlissandoModel that subscribes to changes and causes React to redraw on each change.
 */
export declare const useGlissandoModel: (
  initialState?:
    | ({
        sideViews?: number | undefined;
      } & {
        location?: string | undefined;
        locations?: string[] | undefined;
        index?: undefined;
        count?: undefined;
      })
    | ({
        sideViews?: number | undefined;
      } & {
        index?: number | undefined;
        count?: number | undefined;
        location?: undefined;
        locations?: undefined;
      })
    | undefined,
) => Glissando.Model;
