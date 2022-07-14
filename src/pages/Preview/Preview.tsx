import React, { useRef, useState } from 'react';
import { Header, PlotPreview, Sidebar } from '../../components';
import { DatasetModal } from '../../components/DatasetModal/DatasetModal';
import { PreviewContextProvider } from '../../context/PreviewContext';
import { useGetColor } from '../../hooks/useGetColor';
import { useUploadStore } from '../../store/useUploadStore';
import { Dataset, RGB } from '../../types';
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
    const [colors, setColors] = useState<Array<RGB | null>>([null, null]);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const [isEyedrop, setIsEyedrop] = useState<boolean>(false);
    const [isDatasetOpen, setIsDatasetOpen] = useState<boolean>(false);
    const [dataset, setDataset] = useState<Dataset>({});
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
            colors,
            dots,
        };

        fetch('http://127.0.0.1:5000/digit', {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((res) => {
                setDataset(res.dataset);
                setIsDatasetOpen(true);
                console.log(res);
            });
    };

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
            <DatasetModal
                isOpen={isDatasetOpen}
                onRequestClose={() => setIsDatasetOpen(false)}
                dataset={dataset}
            />
        </PreviewContextProvider>
    );
};
