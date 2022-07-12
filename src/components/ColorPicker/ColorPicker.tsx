import React, { useState } from 'react';
import { RGB } from '../../types';
import { ColorModal } from '../ColorModal/ColorModal';
import './style.css';

interface ColorPickerProps {
    title: string;
    color: string;
    onChange: (color: string) => void;
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

    const handleDominantColorClick = ({ r, g, b }: RGB) => {
        setShowModal(false);
        onChange(`rgb(${r},${g},${b})`);
    };

    const handleCloseModal = ({ r, g, b }: RGB) => {
        setShowModal(false);
        onChange(`rgb(${r},${g},${b})`);
    };

    return (
        <>
            <div
                className="ColorPicker"
                data-color={color}
                onClick={handleClick}
                style={{
                    backgroundColor: color,
                }}
            >
                {color === '' ? <span>none</span> : ''}
            </div>
            <ColorModal
                title={title}
                show={showModal}
                onClose={handleCloseModal}
                onEyedrop={handleClickEyedrop}
                onDominantColorClick={handleDominantColorClick}
            />
        </>
    );
};
