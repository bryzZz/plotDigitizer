interface PlotType {
    label: string;
    dots: {
        [key: string]: number | null;
    };
}

interface PlotTypes {
    [key: string]: PlotType;
}

export const plotTypes: PlotTypes = {
    XYPlot: {
        label: '2D x-y plot',
        dots: {
            x1: null,
            x2: null,
            y1: null,
            y2: null,
        },
    },
    BarPlot: {
        label: '2D Bar plot',
        dots: {
            x1: null,
            x2: null,
        },
    },
};
