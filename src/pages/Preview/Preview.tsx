import React, { useEffect, useRef, useState } from 'react';
import { Header, PlotPreview, Sidebar } from '../../components';
import { PreviewContextProvider } from '../../context/PreviewContext';
import { useGetColor } from '../../hooks/useGetColor';
import { useUploadStore } from '../../store/useUploadStore';
import './style.css';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = () => {
    const [imageObjectURL, plotType, dots] = useUploadStore((state) => [
        state.imageObjectURL,
        state.plotType,
        state.dots,
    ]);
    const { run: calculateDominantColors, result: dominantColors } =
        useGetColor();
    const [scale, setScale] = useState<number>(1);
    const [colors, setColors] = useState<string[]>(['', '']);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const [isEyedrop, setIsEyedrop] = useState<boolean>(false);
    const imgRef = useRef(new Image());
    const mousePosRef = useRef({ x: 0, y: 0 });
    const imgCanvasRef = useRef<HTMLCanvasElement>(null);
    const dotsCanvasRef = useRef<HTMLCanvasElement>(null);
    const scopeCanvasRef = useRef<HTMLCanvasElement>(null);

    imgRef.current.src = imageObjectURL;
    const canvasWidth = imgRef.current.width;
    const canvasHeight = imgRef.current.height;

    const handleSubmit = () => {
        const body = {
            image: imgCanvasRef!.current
                ?.toDataURL()
                .replace(/^data:image\/(png|jpg);base64,/, ''),
            type: plotType,
            color: [colors[1], colors[0]],
            dots: dots,
        };
        fetch('http://127.0.0.1:5000', {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                console.log(res.dataset.map((item: any) => item[0]));
                console.log(res.dataset.map((item: any) => item[1]));

                alert(res);
            });
    };

    // useEffect(() => {
    //     console.log('Preview update');
    // });

    return (
        <PreviewContextProvider
            value={{
                imgCanvasRef,
                dotsCanvasRef,
                scopeCanvasRef,
                imgRef,
                mousePosRef,
                scale,
                canvasWidth,
                canvasHeight,
                colors,
                selectedColorIndex,
                dominantColors,
                isEyedrop,
                setScale,
                setColors,
                setIsEyedrop,
                setSelectedColorIndex,
                calculateDominantColors,
            }}
        >
            <div className="Preview">
                <Header />
                <div className="Preview__container container">
                    <PlotPreview className="canvas-container" />
                    <Sidebar onSubmit={handleSubmit} />
                </div>
            </div>
        </PreviewContextProvider>
    );
};
