import React from 'react';
import { useUploadStore } from '../store';
import { PlotPreview, PlotScope } from '../components';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = (props) => {
    const { imageObjectURL, dots, setDots } = useUploadStore();

    const handleAddDot = (
        ctx: CanvasRenderingContext2D,
        y: number,
        x: number
    ) => {
        // if something wrong with dots
        if (!dots) return;

        for (let i = 0; i < dots.length; i++) {
            const { label, value, color, axis } = dots[i];
            if (value === null) {
                setDots(
                    dots.map((dot, index) =>
                        i === index
                            ? { ...dot, value: axis === 'x' ? x : y }
                            : dot
                    )
                );

                ctx.beginPath();

                ctx.fillStyle = color;
                ctx.fillText(label, x, y - 10);
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.closePath();

                break;
            }
        }
    };

    return (
        <div className="Preview">
            {imageObjectURL && (
                <>
                    <div className="canvas-container">
                        <PlotPreview onClick={handleAddDot} />
                    </div>
                    <PlotScope />
                </>
            )}
        </div>
    );
};
