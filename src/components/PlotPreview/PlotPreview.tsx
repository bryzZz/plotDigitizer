import React, { useEffect, useRef } from 'react';
import { usePreviewContext } from '../../context/PreviewContext';
import { useUploadStore } from '../../store/useUploadStore';
import { Button } from '../../types';
import { distance } from '../../utils';
import { PlotPreviewSettings } from './PlotPreviewSettings';
import './style.css';

interface PlotPreviewProps {
    className: string;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({ className }) => {
    const {
        imgCanvasRef,
        dotsCanvasRef,
        imgRef,
        mousePosRef,
        scale,
        canvasWidth,
        canvasHeight,
        colors,
        selectedColorIndex,
        isEyedrop,
        setColors,
        setIsEyedrop,
        calculateDominantColors,
    } = usePreviewContext();
    const [dots, setDots] = useUploadStore((state) => [
        state.dots,
        state.setDots,
    ]);
    const canvasesRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // disable context menu to handle right click
        const { x, y } = mousePosRef.current!;

        if (e.button === Button.Left && isEyedrop) {
            const imgContext = imgCanvasRef.current!.getContext('2d');
            const [r, g, b] = imgContext!.getImageData(x, y, 1, 1).data;
            const newColors = [...colors];
            newColors[selectedColorIndex] = `rgb(${r}, ${g}, ${b})`;
            setColors(newColors);
            setIsEyedrop(false);
            return;
        }

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
            return;
        }
        // if button right -> find dot with minimal distance and delete
        if (e.button === Button.Right) {
            let minDistance = Infinity,
                minDistanceDotIndex = -1;

            for (let i = dots.length - 1; i >= 0; i--) {
                const dot = dots[i];
                if (dot.coords !== null) {
                    let _distance = distance(dot.coords, { x, y });
                    if (_distance < minDistance) {
                        minDistance = _distance;
                        minDistanceDotIndex = i;
                    }
                }
            }

            if (minDistanceDotIndex !== -1 && minDistance <= 15) {
                const newDots = [...dots];
                newDots[minDistanceDotIndex].coords = null;
                setDots(newDots);
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top } = canvasesRef.current!.getBoundingClientRect();
        const y = (clientY - top) / scale;
        const x = (clientX - left) / scale;

        Object.assign(mousePosRef.current!, { x, y });
    };

    const drawImage = (context: CanvasRenderingContext2D) => {
        return new Promise<void>((res) => {
            imgRef.current!.addEventListener(
                'load',
                () => {
                    context.drawImage(imgRef.current!, 0, 0);
                    res();
                },
                { once: true }
            );
        });
    };

    const drawDots = (
        context: CanvasRenderingContext2D,
        radius: number = 5
    ) => {
        dots.forEach(({ coords, color, label }) => {
            if (!coords) return;
            const y = coords.y * scale,
                x = coords.x * scale;

            context.beginPath();

            context.fillStyle = color;
            context.textAlign = 'center';
            context.font = `400 14px Roboto`;
            context.fillText(label, x, y - radius * 2);
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();

            context.closePath();
        });
    };

    useEffect(() => {
        const imgContext = imgCanvasRef.current!.getContext('2d')!;
        drawImage(imgContext).then(() => {
            // console.log('img drawn');
            const imageData = imgContext.getImageData(
                0,
                0,
                canvasWidth,
                canvasHeight
            );
            calculateDominantColors(imageData.data);
        });
    }, [imgRef.current]);

    useEffect(() => {
        const context = dotsCanvasRef.current!.getContext('2d')!;

        context.clearRect(0, 0, canvasWidth * scale, canvasHeight * scale);
        drawDots(context);
    }, [dots, scale]);

    useEffect(() => {
        console.log('PlotPreview update');
    });

    return (
        <div className={`PlotPreview ${className}`}>
            <PlotPreviewSettings />
            <div
                className={`PlotPreview__canvases ${
                    isEyedrop ? 'eyedrop' : ''
                }`}
                style={{
                    width: canvasWidth * scale,
                    height: canvasHeight * scale,
                }}
                ref={canvasesRef}
                onClick={handleClick}
                onContextMenu={handleClick}
                onMouseMove={handleMouseMove}
            >
                <canvas
                    className="PlotPreview__image"
                    ref={imgCanvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                />
                <canvas
                    className="PlotPreview__dots"
                    ref={dotsCanvasRef}
                    width={canvasWidth * scale}
                    height={canvasHeight * scale}
                />
            </div>
        </div>
    );
};
