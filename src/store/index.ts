import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Dot } from '../types';

interface UploadState {
    imageObjectURL: string;
    plotType: string;
    dots: Dot[] | null;
    setImageObjectURL: (image: string) => void;
    setPlotType: (plotType: string) => void;
    setDots: (dots: Dot[]) => void;
}

export const useUploadStore = create<UploadState>()(
    devtools((set) => ({
        imageObjectURL: '',
        plotType: '',
        dots: null,
        setImageObjectURL: (imageObjectURL) => set(() => ({ imageObjectURL })),
        setPlotType: (plotType) => set(() => ({ plotType })),
        setDots: (dots) => set(() => ({ dots })),
    }))
);
