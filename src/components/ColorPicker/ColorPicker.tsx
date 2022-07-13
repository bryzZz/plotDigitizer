import React, { useState } from 'react';
import { RGB } from '../../types';
import { ColorModal } from '../ColorModal/ColorModal';
import './style.css';

interface ColorPickerProps {
    title: string;
    color: RGB | null;
    onChange: (color: RGB) => void;
    onEyedrop: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    title,
    color,
    onChange,
    onEyedrop,
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClickEyedrop = () => {
        setShowModal(false);
        onEyedrop();
    };

    const handleDominantColorClick = (color: RGB) => {
        setShowModal(false);
        onChange(color);
    };

    const handleCloseModal = (color: RGB | null) => {
        setShowModal(false);
        if (color) {
            onChange(color);
        }
    };

    return (
        <>
            <div
                className="ColorPicker"
                data-color={color}
                onClick={handleClick}
                style={{
                    backgroundColor: color
                        ? `rgb(${color.r},${color.g},${color.b})`
                        : 'transparent',
                }}
            >
                {!color && <span>none</span>}
            </div>
            <ColorModal
                title={title}
                isOpen={showModal}
                onClose={handleCloseModal}
                onEyedrop={handleClickEyedrop}
                onDominantColorClick={handleDominantColorClick}
            />
        </>
    );
};
