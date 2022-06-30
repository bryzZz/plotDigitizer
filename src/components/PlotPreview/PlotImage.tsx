import React, { useEffect } from 'react';

interface PlotImageProps {
    width: number;
    height: number;
}

export const PlotImage = React.forwardRef<HTMLCanvasElement, PlotImageProps>(
    ({ width, height }, ref) => {
        useEffect(() => {
            console.log('PlotImage update');
        });

        return (
            <canvas
                className="PlotPreview__image"
                ref={ref}
                width={width}
                height={height}
            />
        );
    }
);
