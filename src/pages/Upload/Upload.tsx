import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadStore } from '../../store';
import { plotTypes } from '../../utils';
import './style.css';

interface UploadProps {}

const plotNames = Object.keys(plotTypes);

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        imageObjectURL,
        plotType,
        setImageObjectURL,
        setPlotType,
        setDots,
    } = useUploadStore();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null);

    const handleChangeFile = () => {
        const image = fileRef.current?.files?.[0];
        if (!image) return;

        const url = URL.createObjectURL(image);
        console.log(image, url);

        setImageObjectURL(url);
    };

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
        <div className="Upload container container--upload">
            <form onSubmit={handleSubmit} className="Upload__form">
                <div className="Upload__file">
                    <h3 className="Upload__subtitle">Choose plot image</h3>
                    <input
                        ref={fileRef}
                        type="file"
                        name="file"
                        onChange={handleChangeFile}
                    />
                </div>
                <div className="Upload__plot-type">
                    <h3 className="Upload__subtitle">Choose your plot type</h3>
                    <div className="Upload__inputs">
                        {plotNames.map((plotName) => (
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
    );
};
