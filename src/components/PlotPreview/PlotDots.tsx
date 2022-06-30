import React, { useEffect } from 'react';

interface PlotDotsProps {
    width: number;
    height: number;
}

export const PlotDots = React.forwardRef<HTMLCanvasElement, PlotDotsProps>(
    ({ width, height }, ref) => {
        useEffect(() => {
            console.log('PlotDots update');
        });

        return (
            <canvas
                className="PlotPreview__dots"
                ref={ref}
                width={width}
                height={height}
            />
        );
    }
);
