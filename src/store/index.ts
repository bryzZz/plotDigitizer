import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FileState {
    file: File | null;
    plotType: string | null;
    setFile: (file: File) => void;
    setPlotType: (plotType: string) => void;
}

export const useStore = create<FileState>()(
    devtools(
        persist((set) => ({
            file: null,
            plotType: null,
            setFile: (file) => set(() => ({ file })),
            setPlotType: (plotType) => set(() => ({ plotType })),
        }))
    )
);
