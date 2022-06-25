export type DotColor = 'lime' | 'tomato';

export type Dot = {
    label: string;
    color: DotColor;
    axis: 'x' | 'y';
    value: number | null;
};

export type PlotType = {
    label: string;
    dots: Dot[];
};

export type PlotTypes = {
    [key: string]: PlotType;
};
