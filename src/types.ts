export type DotColor = 'lime' | 'tomato';

export type Coords2 = { x: number; y: number };

export type Dot = {
    label: string;
    color: DotColor;
    axis: 'x' | 'y';
    coords: Coords2 | null;
};

export type PlotType = {
    label: string;
    iconComponent: React.FunctionComponent;
    dots: Dot[];
};

export type PlotTypes = {
    [key: string]: PlotType;
};

export const enum Button {
    Left = 0,
    Right = 2,
}

export type RGB = { r: number; g: number; b: number };
