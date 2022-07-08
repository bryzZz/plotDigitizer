import { createContext, useContext } from 'react';
import { Coords2, DominantColor } from '../types';

function createCtx<A extends {} | null>() {
    const ctx = createContext<A | undefined>(undefined);
    function useCtx() {
        const c = useContext(ctx);
        if (c === undefined)
            throw new Error('useCtx must be inside a Provider with a value');
        return c;
    }
    return [useCtx, ctx.Provider] as const;
}

interface PreviewContextState {
    imgCanvasRef: React.RefObject<HTMLCanvasElement>;
    dotsCanvasRef: React.RefObject<HTMLCanvasElement>;
    scopeCanvasRef: React.RefObject<HTMLCanvasElement>;
    imgRef: React.RefObject<HTMLImageElement>;
    mousePosRef: React.RefObject<Coords2>;
    scale: number;
    canvasWidth: number;
    canvasHeight: number;
    colors: string[];
    selectedColorIndex: number;
    isEyedrop: boolean;
    dominantColors: DominantColor[];
    setScale: React.Dispatch<React.SetStateAction<number>>;
    setColors: React.Dispatch<React.SetStateAction<string[]>>;
    setIsEyedrop: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedColorIndex: React.Dispatch<React.SetStateAction<number>>;
    calculateDominantColors: (data: Uint8ClampedArray) => void;
}

export const [usePreviewContext, PreviewContextProvider] =
    createCtx<PreviewContextState>();
