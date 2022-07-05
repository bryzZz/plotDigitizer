import React, { useEffect } from 'react';
import { Button } from '../../types';
import { PlotPreviewSettings } from './PlotPreviewSettings';
import './style.css';

interface PlotPreviewProps {
    className: string;
    scale: number;
    width: number;
    height: number;
    imgRef: React.RefObject<HTMLCanvasElement>;
    dotsRef: React.RefObject<HTMLCanvasElement>;
    onClick: (button: Button) => void;
    onMouseMove: (x: number, y: number) => void;
    setScale: (value: React.SetStateAction<number>) => void;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({
    className,
    scale,
    width,
    height,
    imgRef,
    dotsRef,
    onClick,
    onMouseMove,
    setScale,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // disable context menu to handle right click

        onClick(e.button);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top } = imgRef.current!.getBoundingClientRect();
        const y = (clientY - top) / scale;
        const x = (clientX - left) / scale;

        onMouseMove(x, y);
    };

    useEffect(() => {
        console.log('PlotPreview update');
    });

    return (
        <div className={`PlotPreview ${className}`}>
            <PlotPreviewSettings setScale={setScale} />
            <div
                className="PlotPreview__canvases"
                style={{ width: width * scale, height: height * scale }}
                onClick={handleClick}
                onContextMenu={handleClick}
                onMouseMove={handleMouseMove}
            >
                <canvas
                    className="PlotPreview__image"
                    ref={imgRef}
                    width={width}
                    height={height}
                />
                <canvas
                    className="PlotPreview__dots"
                    ref={dotsRef}
                    width={width * scale}
                    height={height * scale}
                />
            </div>
        </div>
    );
};
