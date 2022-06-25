import { Coords2, PlotTypes } from './types';

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
