import React from 'react';
import { useStore } from '../store';
import { PlotPreview, PlotScope } from '../components';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = (props) => {
    const file = useStore((state) => state.file);

    const handleAddDot = (
        ctx: CanvasRenderingContext2D,
        y: number,
        x: number
    ) => {
        for (const [key, value] of Object.entries(dotes)) {
            if (value === null) {
                if (key[0] === 'x') {
                    ctx.fillStyle = 'lime';
                    setDotes({ ...dotes, [key]: x });
                } else {
                    ctx.fillStyle = 'tomato';
                    setDotes({ ...dotes, [key]: y });
                }

                ctx.beginPath();

                ctx.fillText(key, x, y - 10);
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.closePath();

                break;
            }
        }
    };

    return (
        <div className="Preview">
            {file && (
                <>
                    <div className="canvas-container">
                        <PlotPreview
                            plotImgFile={file}
                            onClick={handleAddDot}
                        />
                    </div>
                    <PlotScope />
                </>
            )}
        </div>
    );
};
