import React from 'react';
import './style.css';

interface RadioProps {
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    IconComponent: React.FunctionComponent;
}

export const Radio: React.FC<RadioProps> = ({
    value,
    checked,
    label,
    name,
    onChange,
    IconComponent,
}) => {
    return (
        <div className="checkbox">
            <label className="checkbox-wrapper">
                <input
                    type="radio"
                    className="checkbox-input"
                    checked={checked}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
                <span className="checkbox-tile">
                    <span className="checkbox-icon">
                        <IconComponent />
                    </span>
                    <span className="checkbox-label">{label}</span>
                </span>
            </label>
        </div>
    );
};
