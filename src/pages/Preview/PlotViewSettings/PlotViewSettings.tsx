import React from 'react';
import { usePreviewContext } from '../../../context/PreviewContext';
import './style.css';

interface PlotViewSettingsProps {}

export const PlotViewSettings: React.FC<PlotViewSettingsProps> = () => {
    const { setScale } = usePreviewContext();

    return (
        <div className="PlotViewSettings">
            <button onClick={() => setScale((p) => +(p - 0.1).toFixed(2))}>
                -
            </button>
            <button onClick={() => setScale((p) => +(p + 0.1).toFixed(2))}>
                +
            </button>
            <button onClick={() => setScale(1)}>100%</button>
        </div>
    );
};
