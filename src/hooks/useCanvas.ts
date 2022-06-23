import { useRef, useEffect } from 'react';
import { Draw } from '../types';

const buildRgb = (imageData: ImageData['data']) => {
    const rgbValues = [];
    for (let i = 0; i < imageData.length; i += 4) {
        const rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
        };
        rgbValues.push(rgb);
    }
    return rgbValues;
};

export const useCanvas = (draw: Draw) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        // let animationFrameId: number;
        // timestamp: number = 0,
        // pTimestamp: number = 0,
        // fps: number = 0;

        // const render = () => {
        draw(context);
        console.log(context.getImageData(0, 0, 100, 100));

        // animationFrameId = requestAnimationFrame((newTimestamp) => {
        //     pTimestamp = timestamp;
        //     timestamp = newTimestamp;
        //     (fps = 1000 / (timestamp - pTimestamp)), draw(context);

        //     render();
        // });

        // animationFrameId = requestAnimationFrame(render);
        // };

        // render();

        // return () => {
        //     cancelAnimationFrame(animationFrameId);
        // };
    }, [draw]);

    return canvasRef;
};
