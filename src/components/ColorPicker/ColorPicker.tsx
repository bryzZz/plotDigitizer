import React, { memo, useCallback, useState } from 'react';
import { RGB } from '../../types';
import { ColorModal } from '../ColorModal/ColorModal';
import './style.css';

interface ColorPickerProps {
    title: string;
    color: string;
    onChange: (color: string) => void;
    onEyedrop: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = memo(
    ({ title, color, onChange, onEyedrop }) => {
        const [showModal, setShowModal] = useState<boolean>(false);

        const handleClick = () => {
            setShowModal(true);
        };

        const handleClickEyedrop = useCallback(() => {
            setShowModal(false);
            onEyedrop();
        }, []);

        const handleDominantColorClick = useCallback(({ r, g, b }: RGB) => {
            setShowModal(false);
            onChange(`rgb(${r},${g},${b})`);
        }, []);

        const handleCloseModal = useCallback(({ r, g, b }: RGB) => {
            setShowModal(false);
            onChange(`rgb(${r},${g},${b})`);
        }, []);

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
    }
);
