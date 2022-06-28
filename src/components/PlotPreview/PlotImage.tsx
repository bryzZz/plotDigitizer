import React, { useRef, useEffect, useState, useTransition } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { getColors } from '../../utils';

interface PlotImageProps {
    img: HTMLImageElement;
    width: number;
    height: number;
    scale: number;
}

export const PlotImage: React.FC<PlotImageProps> = ({
    img,
    width,
    height,
    scale,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const context = canvasRef.current!.getContext('2d');

        img.onload = () => {
            // sometimes the picture is not drawn if you do not do this
            setTimeout(() => {
                context!.drawImage(img, 0, 0);

                const imageData = context!.getImageData(0, 0, width, height);

                // startTransition(() => {
                //     getColors(imageData.data);
                // });
                // const start = performance.now();
                // const colors = ;
                // console.log('perf: ', performance.now() - start);
            }, 0);
        };
    }, [img]);

    useEffect(() => {
        console.log('image update');
    });

    return (
        <canvas
            className="PlotPreview__image"
            ref={canvasRef}
            width={width}
            height={height}
            style={{
                width: width * scale,
                height: height * scale,
            }}
        />
    );
};
