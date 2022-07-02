import React, { useState } from 'react';
import './style.css';

interface ColorPickerProps {
    color: string;
    variants: string[];
    onChange: (color: string) => void;
    onEyedrop: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    color,
    variants,
    onChange,
    onEyedrop,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () => {
        setIsOpen((p) => !p);
    };

    return (
        <div
            className="ColorPicker"
            data-color={color}
            onClick={handleClick}
            style={{
                backgroundColor: color,
            }}
        >
            {color === '' ? <span>none</span> : ''}
            <div className={`ColorPicker__popup ${isOpen ? 'open' : ''}`}>
                {variants.map((variant) => (
                    <div
                        key={variant}
                        onClick={() => onChange(variant)}
                        style={{ backgroundColor: variant }}
                    ></div>
                ))}
                <div
                    className="ColorPicker__eyedrop"
                    onClick={() => onEyedrop()}
                ></div>
            </div>
        </div>
    );
};
