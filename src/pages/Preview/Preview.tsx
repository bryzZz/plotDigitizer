import React, { useRef, useState } from 'react';
import { Header } from '../../components';
import { PlotView } from './PlotView/PlotView';
import { Sidebar } from './Sidebar/Sidebar';
import { DatasetModal } from './DatasetModal/DatasetModal';
import { PreviewContextProvider } from '../../context/PreviewContext';
import { useFetch } from '../../hooks/useFetch';
import { useGetColor } from '../../hooks/useGetColor';
import { useUploadStore } from '../../store/useUploadStore';
import { Dataset, RGB } from '../../types';
import './style.css';

interface PreviewProps {}

interface ApiResponse {
    dataset: Dataset;
}

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
    const { fetchData, data } = useFetch<ApiResponse>(
        'http://127.0.0.1:5000/digit'
    );
    const imgRef = useRef(new Image());
    const mousePosRef = useRef({ x: 0, y: 0 });
    const imgCanvasRef = useRef<HTMLCanvasElement>(null);
    const dotsCanvasRef = useRef<HTMLCanvasElement>(null);
    const scopeCanvasRef = useRef<HTMLCanvasElement>(null);

    imgRef.current.src = imageObjectURL;
    const canvasWidth = imgRef.current.width;
    const canvasHeight = imgRef.current.height;

    const handleSubmit = async () => {
        await fetchData({
            method: 'POST',
            body: {
                image: imgCanvasRef!.current
                    ?.toDataURL()
                    .replace(/^data:image\/(png|jpg);base64,/, ''),
                type: plotType,
                colors,
                dots,
            },
        });
        setIsDatasetOpen(true);
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
                    <PlotView className="canvas-container" />
                    <Sidebar onSubmit={handleSubmit} />
                </div>
            </div>
            <DatasetModal
                isOpen={isDatasetOpen}
                onRequestClose={() => setIsDatasetOpen(false)}
                dataset={data?.dataset || {}}
            />
        </PreviewContextProvider>
    );
};
