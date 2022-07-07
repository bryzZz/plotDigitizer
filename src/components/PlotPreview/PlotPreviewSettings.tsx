import React from 'react';
import { usePreviewContext } from '../../context/PreviewContext';

interface PlotPreviewSettingsProps {}

export const PlotPreviewSettings: React.FC<PlotPreviewSettingsProps> = () => {
    const { setScale } = usePreviewContext();

    return (
        <div className="PlotPreviewSettings">
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
