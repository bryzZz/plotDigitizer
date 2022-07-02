import React from 'react';

interface PlotScopeProps {}

export const PlotScope = React.forwardRef<HTMLCanvasElement, PlotScopeProps>(
    (props, ref) => {
        return (
            <canvas
                className="PlotScope"
                ref={ref}
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
    }
);
