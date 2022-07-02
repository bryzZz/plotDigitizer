import React from 'react';
import { Coords2, RGB } from './types';

export const distance = (a: Coords2, b: Coords2) => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

export const getCoordsFromElement = (
    element: HTMLElement,
    e: React.MouseEvent
) => {
    const { clientX, clientY } = e;
    const { left, top } = element.getBoundingClientRect();

    const y = clientY - top;
    const x = clientX - left;

    return { y, x };
};

export const getColors = (imageData: Uint8ClampedArray): [string, number][] => {
    const colors = new Map<string, number>();

    for (let i = 0; i < imageData.length; i += 4) {
        const color = [imageData[i], imageData[i + 1], imageData[i + 2]].join(
            ','
        );
        if (colors.has(color)) {
            colors.set(color, colors.get(color)! + 1);
        } else {
            colors.set(color, 1);
        }
    }

    const result = [...colors.entries()].sort((a, b) => b[1] - a[1]);

    // const rgbResult: [RGB, number][] = [];
    // for (const [k, v] of result) {
    //     const sk = k.split(',').map(parseInt);
    //     rgbResult.push([{ r: sk[0], g: sk[1], b: sk[2] }, v]);
    // }

    return result;
};
