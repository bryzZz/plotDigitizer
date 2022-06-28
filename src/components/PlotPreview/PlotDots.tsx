import React, { useEffect, useRef } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { Button } from '../../types';
import { distance } from '../../utils';

interface PlotDotsProps {
    width: number;
    height: number;
    scale: number;
}

export const PlotDots: React.FC<PlotDotsProps> = ({ width, height, scale }) => {
    const [dots, setDots] = useUploadStore((state) => [
        state.dots,
        state.setDots,
    ]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const context = canvasRef.current!.getContext('2d');
        const radius = 5;

        context!.clearRect(0, 0, width * scale, height * scale);
        dots.forEach(({ coords, color, label }) => {
            if (!coords) return;
            const y = coords.y * scale,
                x = coords.x * scale;

            context!.beginPath();

            context!.fillStyle = color;
            context!.textAlign = 'center';
            context!.font = `400 14px Roboto`;
            context!.fillText(label, x, y - radius * 2);
            context!.arc(x, y, radius, 0, Math.PI * 2);
            context!.fill();

            context!.closePath();
        });
    }, [dots, scale]);

    useEffect(() => {
        console.log('dots update');
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // disable context menu to handle right click

        const { clientX, clientY } = e;
        const { left, top } = canvasRef.current!.getBoundingClientRect();
        const y = (clientY - top) / scale;
        const x = (clientX - left) / scale;

        // if button left -> just set coords for new dot
        if (e.button === Button.Left) {
            for (let i = 0; i < dots.length; i++) {
                const { coords } = dots[i];
                if (coords === null) {
                    const newDots = [...dots];
                    newDots[i].coords = { x, y };
                    setDots(newDots);

                    break;
                }
            }
            // if button right -> find dot with minimal distance and delete
        } else if (e.button === Button.Right) {
            let minDistance = Infinity,
                minDistanceDotIndex = -1;

            dots.forEach((dot, index) => {
                if (dot.coords !== null) {
                    let _distance = distance(dot.coords, { x, y });
                    if (_distance < minDistance) {
                        minDistance = _distance;
                        minDistanceDotIndex = index;
                    }
                }
            });

            if (minDistanceDotIndex !== -1 && minDistance <= 15) {
                const newDots = [...dots];
                newDots[minDistanceDotIndex].coords = null;
                setDots(newDots);
            }
        }
    };

    return (
        <canvas
            className="PlotPreview__dots"
            ref={canvasRef}
            onClick={handleClick}
            onContextMenu={handleClick}
            width={width * scale}
            height={height * scale}
            style={{
                width: width * scale,
                height: height * scale,
            }}
        />
    );
};
