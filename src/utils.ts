import { PlotTypes } from './types';

export const plotTypes: PlotTypes = {
    XYPlot: {
        label: '2D x-y plot',
        dots: [
            { label: 'y1', value: null, color: 'lime', axis: 'y' },
            { label: 'y2', value: null, color: 'lime', axis: 'y' },
            { label: 'x1', value: null, color: 'tomato', axis: 'x' },
            { label: 'x2', value: null, color: 'tomato', axis: 'x' },
        ],
    },
    BarPlot: {
        label: '2D Bar plot',
        dots: [
            { label: 'p1', value: null, color: 'lime', axis: 'y' },
            { label: 'p2', value: null, color: 'tomato', axis: 'y' },
        ],
    },
};
