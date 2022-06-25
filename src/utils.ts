import { Coords2, PlotTypes } from './types';

export const plotTypes: PlotTypes = {
    XYPlot: {
        label: '2D x-y plot',
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    BarPlot: {
        label: '2D Bar plot',
        dots: [
            { label: 'p1', coords: null, color: 'lime', axis: 'y' },
            { label: 'p2', coords: null, color: 'tomato', axis: 'y' },
        ],
    },
};

export const drawDot = (
    ctx: CanvasRenderingContext2D,
    y: number,
    x: number,
    radius: number,
    color: string,
    label: string
) => {
    ctx.beginPath();

    ctx.fillStyle = color;
    ctx.fillText(label, x, y - radius * 2);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();
};

export const distance = (a: Coords2, b: Coords2) => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};
