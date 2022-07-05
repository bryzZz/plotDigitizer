import { useRef } from 'react';
import { useUploadStore } from '../store/useUploadStore';

export const usePreview = () => {
    const [imageObjectURL, dots, plotType, setDots] = useUploadStore(
        (state) => [
            state.imageObjectURL,
            state.dots,
            state.plotType,
            state.setDots,
        ]
    );

    const { current: img } = useRef(new Image());
    const { current: mouseCoords } = useRef({ x: 0, y: 0 });
    const imgRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<HTMLCanvasElement>(null);
    const scopeRef = useRef<HTMLCanvasElement>(null);

    img.src = imageObjectURL;
    const canvasWidth = img.width;
    const canvasHeight = img.height;
};
