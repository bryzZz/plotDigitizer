import React from 'react';
import { usePreviewContext } from '../../../context/PreviewContext';
import { RGB } from '../../../types';
import { ColorPicker } from '../ColorPicker/ColorPicker';

interface PlotColorsProps {}

export const PlotColors: React.FC<PlotColorsProps> = (props) => {
    const { colors, setColors, setIsEyedrop, setSelectedColorIndex } =
        usePreviewContext();

    const handleClickEyedrop = (index: number) => {
        setIsEyedrop(true);
        setSelectedColorIndex(index);
    };

    const handleChangeColor = (color: RGB, index: number) => {
        const newColors = [...colors];
        newColors[index] = color;
        setColors(newColors);
    };

    return (
        <div className="Sidebar__block-color">
            <div>
                <p className="Sidebar__block-subtitle">Background color:</p>
                <ColorPicker
                    title="Pick background color"
                    color={colors[0]}
                    onChange={(color) => handleChangeColor(color, 0)}
                    onEyedrop={() => handleClickEyedrop(0)}
                />
            </div>
            {colors.slice(1).map((foregroundColor, i) => (
                <div key={i}>
                    <p className="Sidebar__block-subtitle">Plot color:</p>
                    <ColorPicker
                        title="Pick plot color"
                        color={foregroundColor}
                        onChange={(color) => handleChangeColor(color, i + 1)}
                        onEyedrop={() => handleClickEyedrop(i + 1)}
                    />
                </div>
            ))}
        </div>
    );
};
