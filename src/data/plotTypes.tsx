import { PlotTypes as PlotTypes } from '../types';
import { ReactComponent as LinePlot } from '../assets/line-plot.svg';
import { ReactComponent as LineFilledPlot } from '../assets/line-filled-plot.svg';
import { ReactComponent as ScatterPlot } from '../assets/scatter-plot.svg';
import { ReactComponent as BarPlot } from '../assets/bar-plot.svg';

export const plotTypes: PlotTypes = {
    line: {
        label: 'x-y plot',
        iconComponent: LinePlot,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    line_filled: {
        label: 'x-y filled',
        iconComponent: LineFilledPlot,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    points: {
        label: 'Scatter plot',
        iconComponent: ScatterPlot,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    barplot: {
        label: 'Bar plot',
        iconComponent: BarPlot,
        dots: [
            { label: 'p1', coords: null, color: 'lime', axis: 'y' },
            { label: 'p2', coords: null, color: 'tomato', axis: 'y' },
        ],
    },
};
