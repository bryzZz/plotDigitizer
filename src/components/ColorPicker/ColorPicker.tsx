import React, { useState } from 'react';
import './style.css';

interface ColorPickerProps {}

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [color, setColor] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () => {
        setIsOpen((p) => !p);
    };

    return (
        <div className="ColorPicker" data-color={color} onClick={handleClick}>
            {color === '' ? <span>none</span> : ''}
            <div className={`ColorPicker__popup ${isOpen ? 'open' : ''}`}>
                colors here
            </div>
        </div>
    );
};
