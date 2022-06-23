import React from 'react';
import { useCanvas } from '../hooks';
import { Draw } from '../types';

interface CanvasProps
    extends React.DetailedHTMLProps<
        React.CanvasHTMLAttributes<HTMLCanvasElement>,
        HTMLCanvasElement
    > {
    draw: Draw;
}

const Canvas: React.FC<CanvasProps> = ({ draw, ...other }) => {
    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} {...other} />;
};

export default Canvas;
