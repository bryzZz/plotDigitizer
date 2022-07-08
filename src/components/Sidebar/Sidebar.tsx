import React from 'react';
import { usePreviewContext } from '../../context/PreviewContext';
import { ColorPicker, MagneticButton, PlotScope } from '../index';
import './style.css';

interface SidebarProps {
    onSubmit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSubmit }) => {
    const {
        colors,
        dominantColors,
        setColors,
        setIsEyedrop,
        setSelectedColorIndex,
    } = usePreviewContext();

    const handleClickEyedrop = (index: number) => {
        setIsEyedrop(true);
        setSelectedColorIndex(index);
    };

    const handleChangeColor = (color: string, index: number) => {
        const newColors = [...colors];
        newColors[index] = color;
        setColors(newColors);
    };

    return (
        <aside className="Sidebar">
            <PlotScope />
            <div className="Sidebar__block">
                <h4 className="Sidebar__subtitle">Colors management</h4>
                <div className="Sidebar__block-color">
                    <div>
                        <p className="Sidebar__block-subtitle">
                            Background color:
                        </p>
                        <ColorPicker
                            color={colors[0]}
                            variants={dominantColors}
                            onChange={(color) => handleChangeColor(color, 0)}
                            onEyedrop={() => handleClickEyedrop(0)}
                        />
                    </div>
                    {colors.slice(1).map((foregroundColor, i) => (
                        <div key={foregroundColor}>
                            <p className="Sidebar__block-subtitle">
                                Plot color:
                            </p>
                            <ColorPicker
                                color={foregroundColor}
                                variants={dominantColors}
                                onChange={(color) =>
                                    handleChangeColor(color, i + 1)
                                }
                                onEyedrop={() => handleClickEyedrop(i + 1)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <MagneticButton
                className="Sidebar__submit"
                onClick={onSubmit}
                size="small"
            >
                Submit
            </MagneticButton>
        </aside>
    );
};
