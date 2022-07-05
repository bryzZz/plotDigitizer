import React from 'react';

interface PlotPreviewSettingsProps {
    setScale: (value: React.SetStateAction<number>) => void;
}

export const PlotPreviewSettings: React.FC<PlotPreviewSettingsProps> = ({
    setScale,
}) => {
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
