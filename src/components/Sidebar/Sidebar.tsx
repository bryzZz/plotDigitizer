import React from 'react';
import { usePreviewContext } from '../../context/PreviewContext';
import { ColorPicker, MagneticButton, PlotScope } from '../index';

interface SidebarProps {
    onSubmit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSubmit }) => {
    const { colors, dominantColors, setIsEyedrop, setSelectedColorIndex } =
        usePreviewContext();

    const handleClickEyedrop = (index: number) => {
        setIsEyedrop(true);
        setSelectedColorIndex(index);
    };

    const handleChangeColor = (color: string, index: number) => {};

    return (
        <aside className="Sidebar">
            <PlotScope />
            <div className="sidebar__block">
                <h4 className="sidebar__subtitle">Colors management</h4>
                <div className="sidebar__block-color">
                    <p className="sidebar__block-subtitle">Background color</p>
                    <ColorPicker
                        color={colors[0]}
                        variants={dominantColors}
                        onChange={(color) => handleChangeColor(color, 0)}
                        onEyedrop={() => handleClickEyedrop(0)}
                    />
                    <p className="sidebar__block-subtitle">Plot color</p>
                    {colors.slice(1).map((foregroundColor, i) => (
                        <ColorPicker
                            key={foregroundColor}
                            color={foregroundColor}
                            variants={dominantColors}
                            onChange={(color) =>
                                handleChangeColor(color, i + 1)
                            }
                            onEyedrop={() => handleClickEyedrop(i + 1)}
                        />
                    ))}
                </div>
            </div>
            <MagneticButton onClick={onSubmit} size="small">
                Submit
            </MagneticButton>
        </aside>
    );
};
