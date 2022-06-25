import React, { useEffect, useRef } from 'react';

interface PlotScopeProps {
    draw: (ctx: CanvasRenderingContext2D) => void;
}

export const PlotScope: React.FC<PlotScopeProps> = ({ draw }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');

        let id: number;
        const render = () => {
            draw(context!);
            id = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(id);
        };
    }, [draw]);

    return (
        <canvas
            className="PlotScope"
            ref={canvasRef}
            style={{ width: '250px', height: '250px', border: '1px solid red' }}
        ></canvas>
    );
};
