import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Header, CustomRadio } from '../../components';
import { useUploadStore } from '../../store';
import { PlotTypes } from '../../types';
import { ReactComponent as LineChart } from '../../assets/line-chart.svg';
import { ReactComponent as BarChart } from '../../assets/bar-chart.svg';
import './style.css';

const plotTypes: PlotTypes = {
    XYPlot: {
        label: '2D x-y plot',
        iconComponent: LineChart,
        dots: [
            { label: 'y1', coords: null, color: 'lime', axis: 'y' },
            { label: 'y2', coords: null, color: 'lime', axis: 'y' },
            { label: 'x1', coords: null, color: 'tomato', axis: 'x' },
            { label: 'x2', coords: null, color: 'tomato', axis: 'x' },
        ],
    },
    BarPlot: {
        label: '2D Bar plot',
        iconComponent: BarChart,
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

    const handleChangePlotType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlotType(e.target.value);
        // set dots for plot type
        setDots(plotTypes[e.target.value].dots);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (imageObjectURL && plotType) {
            navigate('preview');
        }
    };

    return (
        <div className="Upload">
            <Header />
            <div className="container container--upload">
                <form onSubmit={handleSubmit} className="Upload__form">
                    <div className="Upload__file">
                        <h3 className="Upload__subtitle">
                            Choose your plot image
                        </h3>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drop plot image here, or click to select</p>
                        </div>
                        {imageObjectURL && (
                            <>
                                <span>preview:</span>
                                <img
                                    className="Upload__preview"
                                    src={imageObjectURL}
                                />
                            </>
                        )}
                    </div>
                    <div className="Upload__plot-type">
                        <h3 className="Upload__subtitle">
                            Choose your plot type
                        </h3>
                        <div className="Upload__inputs">
                            {Object.keys(plotTypes).map((plotName) => (
                                <CustomRadio
                                    key={plotName}
                                    checked={plotType === plotName}
                                    value={plotName}
                                    onChange={handleChangePlotType}
                                    name="plot-type"
                                    label={plotTypes[plotName].label}
                                    IconComponent={
                                        plotTypes[plotName].iconComponent
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <button className="Upload__submit" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
