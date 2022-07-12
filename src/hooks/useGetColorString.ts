import { HEX, HSL, RGB } from '../types';
import { isRGB, isHSL, isHEX } from '../utils';

export const useGetColorString = (color: RGB | HSL | HEX) => {
    let colorString: string = '';
    if (isRGB(color)) {
        colorString = `rgb(${color.r},${color.g},${color.b})`;
    } else if (isHSL(color)) {
        colorString = `hsl(${color.h},${color.s},${color.l})`;
    } else if (isHEX(color)) {
        colorString = color;
    }

    return colorString;
};
