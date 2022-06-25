import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Header } from '../../components';
import { useUploadStore } from '../../store';
import { plotTypes } from '../../utils';
import './style.css';

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
                        <h3 className="Upload__subtitle">Choose plot image</h3>
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
                                <label key={plotName}>
                                    <input
                                        checked={plotType === plotName}
                                        value={plotName}
                                        onChange={handleChangePlotType}
                                        type="radio"
                                        name="plot-type"
                                    />
                                    {plotTypes[plotName].label}
                                </label>
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
