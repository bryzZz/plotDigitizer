import React, { useRef, useEffect, useState } from 'react';
import { useUploadStore } from '../store';
import { Button, Coords2 } from '../types';
import { drawDot } from '../utils';

interface PlotPreviewProps {
    onClick: (y: number, x: number, button: Button) => void;
    onMouseMove: (y: number, x: number) => void;
}

interface CanvasBoundaries {
    width: number;
    height: number;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({
    onClick,
    onMouseMove,
}) => {
    const { imageObjectURL, dots } = useUploadStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasBoundaries, setCanvasBoundaries] = useState<CanvasBoundaries>({
        width: 0,
        height: 0,
    });
    const [coords, setCoords] = useState<Coords2>({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context || !imageObjectURL) return;

        const img = new Image();
        img.src = imageObjectURL;
        img.onload = () => {
            setCanvasBoundaries({ width: img.width, height: img.height });
            // sometimes the picture is not drawn if you do not do this
            setTimeout(() => {
                context.drawImage(img, 0, 0);

                dots.forEach(({ coords, color, label }) => {
                    if (coords)
                        drawDot(context, coords.y, coords.x, 5, color, label);
                });
            }, 0);

            // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
    }, [imageObjectURL, dots]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // disable context menu to handle right click

        onClick(coords.y, coords.x, e.button);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { clientX, clientY } = e;
        const { left, top } = canvas.getBoundingClientRect();

        const y = clientY - top;
        const x = clientX - left;

        setCoords({ y, x });

        onMouseMove(y, x);
    };

    return (
        <canvas
            ref={canvasRef}
            onClick={handleClick}
            onContextMenu={handleClick}
            onMouseMove={handleMouseMove}
            width={canvasBoundaries.width}
            height={canvasBoundaries.height}
            style={{
                width: canvasBoundaries.width,
                height: canvasBoundaries.height,
            }}
        />
    );
};
