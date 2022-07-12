import { Coords2, DominantColor, HEX, HSL, RGB } from './types';

export function distance(a: Coords2, b: Coords2) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function clamp(min: number, value: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

class ColorGroup {
    totalPixelCount = 0;
    averageColor = {
        r: 0,
        g: 0,
        b: 0,
    };
    tolerance = 100;
    constructor(tolerance: number) {
        this.tolerance = tolerance;
    }

    getColorCount() {
        return this.totalPixelCount;
    }

    getAverageColor() {
        return this.averageColor;
    }

    isColorInGroup(r: number, g: number, b: number) {
        if (this.totalPixelCount === 0) {
            return true;
        }

        const dist =
            (this.averageColor.r - r) ** 2 +
            (this.averageColor.g - g) ** 2 +
            (this.averageColor.b - b) ** 2;

        return dist <= this.tolerance ** 2;
    }

    addColor(r: number, g: number, b: number) {
        this.averageColor.r =
            (this.averageColor.r * this.totalPixelCount + r) /
            (this.totalPixelCount + 1);
        this.averageColor.g =
            (this.averageColor.g * this.totalPixelCount + g) /
            (this.totalPixelCount + 1);
        this.averageColor.b =
            (this.averageColor.b * this.totalPixelCount + b) /
            (this.totalPixelCount + 1);
        this.totalPixelCount += 1;
    }
}

export function getDominantColors(
    imageData: Uint8ClampedArray
): DominantColor[] {
    const tolerance = 120,
        groups = [new ColorGroup(tolerance)],
        result: DominantColor[] = [];

    for (let i = 0; i < imageData.length; i += 4) {
        let r = imageData[i],
            g = imageData[i + 1],
            b = imageData[i + 2],
            a = imageData[i + 3],
            isColorAlreadyInGroup = false;

        if (a === 0) {
            r = 255;
            g = 255;
            b = 255;
        }

        for (const group of groups) {
            if (group.isColorInGroup(r, g, b)) {
                group.addColor(r, g, b);
                isColorAlreadyInGroup = true;
                break;
            }
        }

        if (!isColorAlreadyInGroup) {
            const newGroup = new ColorGroup(tolerance);
            newGroup.addColor(r, g, b);
            groups.push(newGroup);
        }
    }

    // sort groups
    groups.sort((a, b) => {
        if (a.getColorCount() > b.getColorCount()) {
            return -1;
        } else if (a.getColorCount() < b.getColorCount()) {
            return 1;
        }
        return 0;
    });

    for (const group of groups) {
        const avColor = group.getAverageColor();

        result.push({
            r: Math.round(avColor.r),
            g: Math.round(avColor.g),
            b: Math.round(avColor.b),
            pixelsCount: group.getColorCount(),
            percentage:
                (100 * group.getColorCount()) / (0.25 * imageData.length),
        });
    }

    return result;
}

export const colorVariants = ['RGB', 'HEX', 'HSL'] as const;

export function RGBToHEX({ r, g, b }: RGB) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function HEXToRGB(hex: string): RGB | null {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

export function RGBToHSL({ r, g, b }: RGB): HSL {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
            ? 2 + (b - r) / s
            : 4 + (r - g) / s
        : 0;
    return {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        l: (100 * (2 * l - s)) / 2,
    };
}

export function isRGB(color: any): color is RGB {
    return (<RGB>color).r !== undefined;
}

export function isHSL(color: any): color is HSL {
    return (<HSL>color).h !== undefined;
}

export function isHEX(color: any): color is HEX {
    return typeof color === 'string';
}
