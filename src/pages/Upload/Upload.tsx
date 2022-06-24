import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { plotTypes } from '../../utils';
import './style.css';

interface UploadProps {}

const plotNames = Object.keys(plotTypes);

export const Upload: React.FC<UploadProps> = (props) => {
    const { file, setFile, plotType, setPlotType } = useStore((state) => state);
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null);

    const handleChangeFile = () => {
        if (!fileRef.current?.files?.length) return;

        console.log(fileRef.current.files[0]);

        setFile(fileRef.current.files[0]);
    };

    const handleChangePlotType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlotType(e.target.value);
    };

    const handleSubmit = () => {
        if (file && plotType) {
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
