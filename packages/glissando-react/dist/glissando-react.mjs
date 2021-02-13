import { GlissandoModel, getSliderStyle } from 'glissando';
import React, { useState, useEffect, useCallback } from 'react';
import { useStream } from 'use-stream';
import { useEffectRef } from '@huse/effect-ref';

const useGlissandoModel = (initialState) => {
    const [model] = useState(GlissandoModel(initialState));
    // Subscribe to changes
    useStream({
        model: () => ({
            _: model.getState,
        }),
        defer: true,
    });
    return model;
};

const GlissandoSlider = props => {
    const { model, children, locations, location } = props;
    const [sliderNode, setSliderNode] = useState();
    const { getState, finalize, setCount, setDirection, getViewIndices, setLocations, goTo, } = model;
    // Child count
    useEffect(() => {
        const count = (children || []).length;
        if (count !== getState().count) {
            setCount(count);
        }
    }, [children, getState, setCount]);
    // Locations
    useEffect(() => {
        if (locations &&
            JSON.stringify(locations) !== JSON.stringify(getState().locations)) {
            setLocations(locations);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locations]);
    // Location
    useEffect(() => {
        if (location && location !== getState().location) {
            goTo({ location });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    // Event listener: transitionend
    const observeTransitionEnd = useCallback((node) => {
        if (node === null) {
            return null;
        }
        setSliderNode(node);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const onTransitionEnd = (evt) => {
            finalize(getState().targetIndex);
        };
        node.addEventListener('transitionend', onTransitionEnd);
        return () => {
            node.removeEventListener('transitionend', onTransitionEnd);
        };
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // Reading direction
    useEffect(() => {
        if (!sliderNode) {
            return;
        }
        const { direction } = getComputedStyle(sliderNode);
        if (direction !== getState().direction) {
            setDirection(direction);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    const sliderRef = useEffectRef((node) => observeTransitionEnd(node));
    if (!children) {
        return null;
    }
    const { className, style } = getSliderStyle(getState());
    return (React.createElement("div", { className: "glissando" },
        React.createElement("div", { className: `glissando-slider ${className}`, style: style, ref: sliderRef }, getViewIndices().map(viewIndex => (React.createElement("div", { key: viewIndex, className: "glissando-page" }, children[viewIndex]))))));
};

export { GlissandoSlider, useGlissandoModel };
