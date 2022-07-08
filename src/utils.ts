import { Coords2, DominantColor } from './types';

export function distance(a: Coords2, b: Coords2) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
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
