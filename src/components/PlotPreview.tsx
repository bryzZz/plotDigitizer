import React, { useRef, useEffect, useState } from 'react';
// import { useCanvas } from '../hooks';
import { Draw } from '../types';

interface PlotPreviewProps {
    plotImgFile: File;
    draw?: Draw;
    onClick: (ctx: CanvasRenderingContext2D, y: number, x: number) => void;
    onMouseMove?: (ctx: CanvasRenderingContext2D, y: number, x: number) => void;
}

interface CanvasBoundaries {
    width: number;
    height: number;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({
    plotImgFile,
    draw,
    onClick,
    onMouseMove,
}) => {
    // const canvasRef = useCanvas(draw);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasBoundaries, setCanvasBoundaries] = useState<CanvasBoundaries>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const image = new Image();
        image.onload = () => {
            setCanvasBoundaries({ width: image.width, height: image.height });
            context.drawImage(image, 0, 0);

            // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
        image.src = URL.createObjectURL(plotImgFile);
    }, [plotImgFile]);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const context = canvas?.getContext('2d');
    //     if (!canvas || !context) return;

    //     draw(context);

    //     console.log(context.getImageData(0, 0, 100, 100));
    // }, [draw]);

    const handleClick = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const { clientX, clientY } = e;
        const { left, top } = canvas.getBoundingClientRect();

        const y = clientY - top;
        const x = clientX - left;

        onClick(context, y, x);
        // draw(context);
    };

    return (
        <canvas
            ref={canvasRef}
            onClick={handleClick}
            width={canvasBoundaries.width}
            height={canvasBoundaries.height}
            style={{
                width: canvasBoundaries.width,
                height: canvasBoundaries.height,
            }}
        />
    );
};
