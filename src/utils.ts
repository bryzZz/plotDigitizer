import { Coords2, RGB } from './types';

export const distance = (a: Coords2, b: Coords2) => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

export const buildRgb = (imageData: Uint8ClampedArray): RGB[] => {
    const rgbValues = [];
    for (let i = 0; i < imageData.length; i += 4) {
        const rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
        };
        rgbValues.push(rgb);
    }
    return rgbValues;
};

export const findBiggestColorRange = (rgbValues: RGB[]) => {
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    rgbValues.forEach((pixel) => {
        rMin = Math.min(rMin, pixel.r);
        gMin = Math.min(gMin, pixel.g);
        bMin = Math.min(bMin, pixel.b);

        rMax = Math.max(rMax, pixel.r);
        gMax = Math.max(gMax, pixel.g);
        bMax = Math.max(bMax, pixel.b);
    });

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;

    const biggestRange = Math.max(rRange, gRange, bRange);
    if (biggestRange === rRange) {
        return 'r';
    } else if (biggestRange === gRange) {
        return 'g';
    } else {
        return 'b';
    }
};

export const quantization = (rgbValues: RGB[], depth: number): any[] => {
    const MAX_DEPTH = 4;
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
        const color = rgbValues.reduce(
            (prev, curr) => {
                prev.r += curr.r;
                prev.g += curr.g;
                prev.b += curr.b;

                return prev;
            },
            {
                r: 0,
                g: 0,
                b: 0,
            }
        );

        color.r = Math.round(color.r / rgbValues.length);
        color.g = Math.round(color.g / rgbValues.length);
        color.b = Math.round(color.b / rgbValues.length);
        return [color];
    }

    const componentToSortBy = findBiggestColorRange(rgbValues);
    rgbValues.sort((p1, p2) => {
        return p1[componentToSortBy] - p2[componentToSortBy];
    });

    const mid = rgbValues.length / 2;
    return [
        ...quantization(rgbValues.slice(0, mid), depth + 1),
        ...quantization(rgbValues.slice(mid + 1), depth + 1),
    ];
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
