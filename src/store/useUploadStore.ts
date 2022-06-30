import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Dot, RGB } from '../types';

interface UploadState {
    imageObjectURL: string;
    plotType: string;
    dots: Dot[];
    imageColors: [RGB, number][];
    setImageObjectURL: (image: string) => void;
    setPlotType: (plotType: string) => void;
    setDots: (dots: Dot[]) => void;
    setImageColors: (imageColors: [RGB, number][]) => void;
}

export const useUploadStore = create<UploadState>()(
    devtools((set) => ({
        imageObjectURL: '',
        plotType: '',
        dots: [],
        imageColors: [],
        setImageObjectURL: (imageObjectURL) =>
            set(() => ({ imageObjectURL }), false, 'setImageObjectURL'),
        setPlotType: (plotType) =>
            set(() => ({ plotType }), false, 'setPlotType'),
        setDots: (dots) => set(() => ({ dots }), false, 'setDots'),
        setImageColors: (imageColors) =>
            set(() => ({ imageColors }), false, 'setImageColors'),
    }))
);
