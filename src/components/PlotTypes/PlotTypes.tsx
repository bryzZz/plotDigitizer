import React, { memo } from 'react';
import { PlotType } from '../../types';
import { Radio } from '../UI';

interface PlotTypesProps {
    className: string;
    plotType: string;
    plotTypes: {
        [key: string]: PlotType;
    };
    onChange: (value: string) => void;
}

export const PlotTypes: React.FC<PlotTypesProps> = memo(
    ({ className, plotType, plotTypes, onChange }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        };

        return (
            <div className={`PlotTypes ${className}`}>
                {Object.keys(plotTypes).map((plotName) => (
                    <Radio
                        key={plotName}
                        checked={plotType === plotName}
                        value={plotName}
                        onChange={handleChange}
                        name="plot-type"
                        label={plotTypes[plotName].label}
                        IconComponent={plotTypes[plotName].iconComponent}
                    />
                ))}
            </div>
        );
    }
);
