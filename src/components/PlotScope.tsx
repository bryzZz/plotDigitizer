import React from 'react';

interface PlotScopeProps {}

export const PlotScope = React.forwardRef<HTMLCanvasElement, PlotScopeProps>(
    (props, ref) => {
        return (
            <canvas
                className="PlotScope"
                ref={ref}
                width={250}
                height={250}
                style={{
                    width: '250px',
                    height: '250px',
                    border: '1px solid tomato',
                }}
            ></canvas>
        );
    }
);
