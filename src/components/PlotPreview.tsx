import React, { useRef, useEffect, useState } from 'react';
import { useUploadStore } from '../store';

interface PlotPreviewProps {
    onClick: (ctx: CanvasRenderingContext2D, y: number, x: number) => void;
    onMouseMove?: (ctx: CanvasRenderingContext2D, y: number, x: number) => void;
}

interface CanvasBoundaries {
    width: number;
    height: number;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({
    onClick,
    onMouseMove,
}) => {
    const imageObjectURL = useUploadStore((state) => state.imageObjectURL);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasBoundaries, setCanvasBoundaries] = useState<CanvasBoundaries>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context || !imageObjectURL) return;

        const img = new Image();
        img.src = imageObjectURL;
        img.onload = () => {
            setCanvasBoundaries({ width: img.width, height: img.height });
            // sometimes the picture is not drawn if you do not do this
            setTimeout(() => context.drawImage(img, 0, 0), 0);

            // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
    }, [imageObjectURL]);

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
