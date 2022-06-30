import React, { useState } from 'react';
import './style.css';

interface ColorPickerProps {
    color: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color }) => {
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
                colors here
            </div>
        </div>
    );
};
