import React, { memo, useState } from 'react';
import { Modal } from '../../../components/UI';
import { ColorInput } from '../ColorInput/ColorInput';
import { usePreviewContext } from '../../../context/PreviewContext';
import { useGetColorString } from '../../../hooks/useGetColorString';
import { RGB } from '../../../types';
import './style.css';

interface ColorModalProps {
    title: string;
    isOpen: boolean;
    onClose: (color: RGB | null) => void;
    onDominantColorClick: (color: RGB) => void;
    onEyedrop: () => void;
}

export const ColorModal: React.FC<ColorModalProps> = memo(
    ({ title, isOpen, onClose, onDominantColorClick, onEyedrop }) => {
        const { dominantColors } = usePreviewContext();
        const [customColor, setCustomColor] = useState<RGB>({
            r: dominantColors[0]?.r || 0,
            g: dominantColors[0]?.g || 0,
            b: dominantColors[0]?.b || 0,
        });
        const [isChange, setIsChange] = useState<boolean>(false);
        const colorString = useGetColorString(customColor);

        const handleClose = () => {
            if (isChange) {
                onClose(customColor);
            } else {
                onClose(null);
            }
        };

        const handleClickEyedrop = () => {
            onEyedrop();
        };

        const handleChangeColor = (value: React.SetStateAction<RGB>) => {
            setCustomColor(value);
            setIsChange(true);
        };

        return (
            <Modal
                title={title}
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="Color Modal"
            >
                <h2 className="ColorModal__title">Custom color:</h2>
                <div className="ColorModal__custom-color">
                    <div style={{ backgroundColor: colorString }}></div>
                    <div
                        className="ColorModal__eyedrop"
                        onClick={handleClickEyedrop}
                    ></div>
                </div>
                <ColorInput
                    className="ColorModal__custom-input"
                    value={customColor}
                    onChange={handleChangeColor}
                />
                <h2 className="ColorModal__title">Dominant colors:</h2>
                <div className="ColorModal__dominant-colors">
                    {dominantColors.map(({ r, g, b }, i) => (
                        <div
                            key={i}
                            className="ColorModal__dominant-color"
                            onClick={() => onDominantColorClick({ r, g, b })}
                            style={{
                                backgroundColor: `rgb(${r},${g},${b})`,
                            }}
                        ></div>
                    ))}
                </div>
            </Modal>
        );
    }
);
