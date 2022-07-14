import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Header, PlotTypes } from '../../components';
import { Button } from '../../components/UI';
import { useUploadStore } from '../../store/useUploadStore';
import { PlotTypes as TPlotTypes } from '../../types';
import { ReactComponent as LinePlot } from '../../assets/line-plot.svg';
import { ReactComponent as LineFilledPlot } from '../../assets/line-filled-plot.svg';
import { ReactComponent as ScatterPlot } from '../../assets/scatter-plot.svg';
import { ReactComponent as BarPlot } from '../../assets/bar-plot.svg';
import './style.css';

const plotTypes: TPlotTypes = {
    line: {
        label: 'x-y plot',
        iconComponent: LinePlot,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    line_filled: {
        label: 'x-y filled',
        iconComponent: LineFilledPlot,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    points: {
        label: 'Scatter plot',
        iconComponent: ScatterPlot,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    barplot: {
        label: 'Bar plot',
        iconComponent: BarPlot,
        dots: [
            { label: 'p1', coords: null, color: 'lime', axis: 'y' },
            { label: 'p2', coords: null, color: 'tomato', axis: 'y' },
        ],
    },
};

interface UploadProps {}

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        imageObjectURL,
        plotType,
        setImageObjectURL,
        setPlotType,
        setDots,
    } = useUploadStore();
    const navigate = useNavigate();
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': ['.jpeg', '.png'] },
        maxFiles: 1,
        onDrop: ([file]) => {
            const url = URL.createObjectURL(file);
            setImageObjectURL(url);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (imageObjectURL && plotType) {
            setDots(plotTypes[plotType].dots); // set dots for plot type
            navigate('preview');
        }
    };

    const handleChangePlotType = useCallback((value: string) => {
        setPlotType(value);
    }, []);

    useEffect(() => console.log('Upload update'));

    return (
        <div className="Upload">
            <Header />
            <div className="container container--upload">
                <form onSubmit={handleSubmit} className="Upload__form">
                    <div className="Upload__form-block">
                        <h3 className="Upload__subtitle">
                            Choose your plot image
                        </h3>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drop plot image here, or click to select</p>
                        </div>
                        {imageObjectURL && (
                            <div className="Upload__preview">
                                <span>Preview:</span>
                                <img src={imageObjectURL} />
                            </div>
                        )}
                    </div>
                    <div className="Upload__form-block">
                        <h3 className="Upload__subtitle">
                            Choose your plot type
                        </h3>
                        <PlotTypes
                            className="Upload__inputs"
                            plotType={plotType}
                            plotTypes={plotTypes}
                            onChange={handleChangePlotType}
                        />
                        <Button
                            className="Upload__submit fill"
                            type="submit"
                            isMagnetic={true}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
