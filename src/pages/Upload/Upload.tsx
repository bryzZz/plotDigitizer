import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Header, CustomRadio, MagneticButton } from '../../components';
import { useUploadStore } from '../../store/useUploadStore';
import { PlotTypes } from '../../types';
import { ReactComponent as LinePlot } from '../../assets/line-plot.svg';
import { ReactComponent as ScatterPlot } from '../../assets/scatter-plot.svg';
import { ReactComponent as BarPlot } from '../../assets/bar-plot.svg';
import './style.css';

const plotTypes: PlotTypes = {
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
        iconComponent: LinePlot,
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
            navigate('preview');
            // set dots for plot type
            setDots(plotTypes[plotType].dots);
        }
    };

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
                        <div className="Upload__inputs">
                            {Object.keys(plotTypes).map((plotName) => (
                                <CustomRadio
                                    key={plotName}
                                    checked={plotType === plotName}
                                    value={plotName}
                                    onChange={(e) =>
                                        setPlotType(e.target.value)
                                    }
                                    name="plot-type"
                                    label={plotTypes[plotName].label}
                                    IconComponent={
                                        plotTypes[plotName].iconComponent
                                    }
                                />
                            ))}
                        </div>
                        <MagneticButton
                            className="Upload__submit fill"
                            type="submit"
                        >
                            Submit
                        </MagneticButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
