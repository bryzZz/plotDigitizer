import React, { useEffect } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { PlotImage } from './PlotImage';
import { PlotDots } from './PlotDots';
import './style.css';

interface PlotPreviewProps {
    scale: number;
}

export const PlotPreview: React.FC<PlotPreviewProps> = ({ scale }) => {
    const imageObjectURL = useUploadStore((state) => state.imageObjectURL);

    const img = new Image();
    img.src = imageObjectURL;
    const canvasWidth = img.width;
    const canvasHeight = img.width;

    useEffect(() => {
        console.log('preview update');
    });

    return (
        <div className="PlotPreview">
            <PlotImage
                img={img}
                height={canvasHeight}
                width={canvasWidth}
                scale={scale}
            />
            <PlotDots height={canvasHeight} width={canvasWidth} scale={scale} />
        </div>
    );
};
