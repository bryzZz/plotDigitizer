import React, { useRef, useState } from 'react';
import Canvas from './components/Canvas';
import { Draw } from './types';

interface AppProps {}

export const App: React.FC<AppProps> = (props) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [draw, setDraw] = useState<Draw | null>(null);

    const handleChange = () => {
        if (!fileRef.current?.files) return;

        console.log(fileRef.current?.files);

        // const img = document.createElement('img');
        // img.src = URL.createObjectURL(fileRef.current.files[0]);
        // img.height = 60;
        // img.onload = function () {
        //     URL.revokeObjectURL(img.src);
        // };

        setDraw(() => (ctx: CanvasRenderingContext2D) => {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0, 1000, 500);
            };
            if (fileRef?.current?.files?.[0]) {
                img.src = URL.createObjectURL(fileRef.current.files[0]);
            }
        });
    };

    // const draw: Draw = (ctx) => {
    //     ctx.fillStyle = 'lime';
    //     ctx.fillRect(0, 0, 100, 100);
    // };

    return (
        <div className="App">
            <input
                ref={fileRef}
                type="file"
                name="file"
                onChange={handleChange}
            />
            <div className="canvas-container">
                {draw && (
                    <Canvas
                        className="canvas"
                        draw={draw}
                        style={{ width: '100%', height: '100%' }}
                        width={1000}
                        height={500}
                    />
                )}
            </div>
        </div>
    );
};
