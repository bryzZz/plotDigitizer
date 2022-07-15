import React from 'react';
import { Radio } from '../../../components/UI';
import { plotTypes } from '../../../data/plotTypes';
import { useUploadStore } from '../../../store/useUploadStore';
import './style.css';

interface PlotTypesProps {}

export const PlotTypes: React.FC<PlotTypesProps> = () => {
    const [plotType, setPlotType] = useUploadStore((state) => [
        state.plotType,
        state.setPlotType,
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlotType(e.target.value);
    };

    return (
        <div className="PlotTypes">
            {Object.keys(plotTypes).map((plotName) => (
                <Radio
                    key={plotName}
                    checked={plotName === plotType}
                    value={plotName}
                    onChange={handleChange}
                    name="plot-type"
                    label={plotTypes[plotName].label}
                    IconComponent={plotTypes[plotName].iconComponent}
                />
            ))}
        </div>
    );
};
