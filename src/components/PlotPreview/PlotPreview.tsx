import React, { useEffect, useRef } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { PlotImage } from './PlotImage';
import { PlotDots } from './PlotDots';
import { Button } from '../../types';
import './style.css';

interface PlotPreviewProps {
    scale: number;
    width: number;
    height: number;
    imgRef: React.RefObject<HTMLCanvasElement>;
    dotsRef: React.RefObject<HTMLCanvasElement>;
    onClick: (x: number, y: number, button: Button) => void;
    onMouseMove: (x: number, y: number) => void;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({
    scale,
    width,
    height,
    imgRef,
    dotsRef,
    onClick,
    onMouseMove,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // disable context menu to handle right click

        const { clientX, clientY } = e;
        const { left, top } = imgRef.current!.getBoundingClientRect();
        const y = (clientY - top) / scale;
        const x = (clientX - left) / scale;

        onClick(x, y, e.button);
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
        <div
            className="PlotPreview"
            style={{ width: width * scale, height: height * scale }}
            onClick={handleClick}
            onContextMenu={handleClick}
            onMouseMove={handleMouseMove}
        >
            <PlotImage ref={imgRef} height={height} width={width} />
            <PlotDots
                ref={dotsRef}
                height={height * scale}
                width={width * scale}
            />
        </div>
    );
};
