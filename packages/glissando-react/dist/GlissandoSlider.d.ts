import { Glissando } from 'glissando';
import { ReactNode } from 'react';
declare type Props = {
    model: Glissando.Model;
    children: ReactNode[];
    locations?: string[];
    location?: string;
    className?: string;
};
export declare const GlissandoSlider: (props: Props) => JSX.Element;
export {};
