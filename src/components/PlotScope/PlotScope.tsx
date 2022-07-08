import React from 'react';
import { usePreviewContext } from '../../context/PreviewContext';

interface PlotScopeProps {}

export const PlotScope: React.FC<PlotScopeProps> = () => {
    const { scopeCanvasRef, imgCanvasRef, dotsCanvasRef, mousePosRef, scale } =
        usePreviewContext();

    const draw = (scopeScale: number = 5, size: number = 250) => {
        const { x, y } = mousePosRef.current!;
        const context = scopeCanvasRef.current?.getContext('2d');
        if (!context) return;

        // draw scope from image
        context.drawImage(
            imgCanvasRef.current!,
            x - size / scopeScale / 2,
            y - size / scopeScale / 2,
            size / scopeScale,
            size / scopeScale,
            0,
            0,
            size,
            size
        );
        // draw scope from dots
        context.drawImage(
            dotsCanvasRef.current!,
            x * scale - (size * scale) / scopeScale / 2,
            y * scale - (size * scale) / scopeScale / 2,
            (size * scale) / scopeScale,
            (size * scale) / scopeScale,
            0,
            0,
            size,
            size
        );

        // draw cross lines
        context.beginPath();
        context.strokeStyle = 'var(--color-border)';
        context.lineWidth = 0.5;
        context.moveTo(size / 2, 0);
        context.lineTo(size / 2, size);
        context.moveTo(0, size / 2);
        context.lineTo(size, size / 2);
        context.stroke();
        context.closePath();
    };

    const animate = () => {
        draw();
        requestAnimationFrame(animate);
    };
    animate();

    return (
        <canvas
            className="PlotScope"
            ref={scopeCanvasRef}
            width={240}
            height={240}
            style={{
                width: '240px',
                height: '240px',
                border: '2px solid var(--color-border)',
                borderRadius: '6px',
                // boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.05)',
                // borderRight: '1px solid var(--color-border)',
                // borderBottom: '1px solid var(--color-border)',
            }}
        ></canvas>
    );
};
