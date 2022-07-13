import React, { memo, useState } from 'react';
import Modal from 'react-modal';
import { usePreviewContext } from '../../context/PreviewContext';
import { useGetColorString } from '../../hooks/useGetColorString';
import { RGB } from '../../types';
import { ColorInput } from '../ColorInput/ColorInput';
// import { Modal } from '../Modal/Modal';
import './style.css';

interface ColorModalProps {
    title: string;
    isOpen: boolean;
    onClose: (color: RGB) => void;
    onDominantColorClick: (color: RGB) => void;
    onEyedrop: () => void;
}

Modal.setAppElement('#root');

export const ColorModal: React.FC<ColorModalProps> = memo(
    ({ title, isOpen, onClose, onDominantColorClick, onEyedrop }) => {
        const { dominantColors } = usePreviewContext();
        const [customColor, setCustomColor] = useState<RGB>({
            r: dominantColors[0]?.r || 0,
            g: dominantColors[0]?.g || 0,
            b: dominantColors[0]?.b || 0,
        });
        const colorString = useGetColorString(customColor);

        const handleClose = () => {
            onClose(customColor);
        };

        const handleClickEyedrop = () => {
            onEyedrop();
        };

        return (
            <Modal
                className="ColorModal"
                overlayClassName="ColorModal__overlay"
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="Color Modal"
            >
                <header className="ColorModal__header">
                    <h1 className="ColorModal__title">{title}</h1>
                </header>
                <main className="ColorModal__main">
                    <h2 className="ColorModal__subtitle">Custom color:</h2>
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
                        onChange={setCustomColor}
                    />
                    <h2 className="ColorModal__subtitle">Dominant colors:</h2>
                    <div className="ColorModal__dominant-colors">
                        {dominantColors.map(({ r, g, b }, i) => (
                            <div
                                key={i}
                                className="ColorModal__dominant-color"
                                onClick={() =>
                                    onDominantColorClick({ r, g, b })
                                }
                                style={{
                                    backgroundColor: `rgb(${r},${g},${b})`,
                                }}
                            ></div>
                        ))}
                    </div>
                </main>
            </Modal>
        );
    }
);
