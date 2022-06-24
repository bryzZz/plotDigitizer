import React, { useRef, useState } from 'react';
import { PlotPreview } from './components/PlotPreview';
import { PlotScope } from './components/PlotScope';
import { Draw } from './types';

interface AppProps {}

interface Dotes {
    x1: number | null;
    x2: number | null;
    y1: number | null;
    y2: number | null;
}

export const App: React.FC<AppProps> = (props) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [plotImgFile, setPlotImgFile] = useState<File | null>(null);
    const [dotes, setDotes] = useState<Dotes>({
        x1: null,
        x2: null,
        y1: null,
        y2: null,
    });

    const handleChange = () => {
        if (!fileRef.current?.files?.length) return;

        console.log(fileRef.current.files[0]);

        setPlotImgFile(fileRef.current.files[0]);
    };

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
        <div className="App">
            <input
                ref={fileRef}
                type="file"
                name="file"
                onChange={handleChange}
            />
            {plotImgFile && (
                <>
                    <div className="canvas-container">
                        <PlotPreview
                            plotImgFile={plotImgFile}
                            onClick={handleAddDot}
                        />
                    </div>
                    <PlotScope />
                </>
            )}
        </div>
    );
};
