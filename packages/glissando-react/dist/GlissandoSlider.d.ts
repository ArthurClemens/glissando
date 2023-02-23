/// <reference types="@types/react" />
import { Glissando } from 'glissando';
import { ReactNode } from 'react';
type Props = {
    /**
     * The slider model.
     */
    model: Glissando.Model;
    /**
     * The elements to slide.
     */
    children: ReactNode[];
    /**
     * (directed use) List of location ids, for example: possible route paths.
     */
    locations?: string[];
    /**
     * (directed use) The current location id, for example: the current route path.
     */
    location?: string;
    /**
     * Extra class name.
     */
    className?: string;
};
export declare const GlissandoSlider: (props: Props) => JSX.Element;
export {};
