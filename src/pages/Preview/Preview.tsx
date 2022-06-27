import React, { useState } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { Header, PlotPreview, PlotScope } from '../../components';
import { distance } from '../../utils';
import { Button, Coords2 } from '../../types';
import './style.css';
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = () => {
    const { dots, setDots } = useUploadStore();
    // const [mouseCoords, setMouseCoords] = useState<Coords2>({ x: 0, y: 0 });

    const handlePreviewClick = (y: number, x: number, button: Button) => {
        // if something wrong with dots
        if (!dots.length) return;

        // if button left -> just set coords for new dot
        if (button === Button.Left) {
            for (let i = 0; i < dots.length; i++) {
                const { coords } = dots[i];
                if (coords === null) {
                    const newDots = [...dots];
                    newDots[i].coords = { x, y };
                    setDots(newDots);

                    break;
                }
            }
            // if button right -> find dot with minimal distance and delete
        } else if (button === Button.Right) {
            let minDistance = Infinity,
                minDistanceDotIndex = -1;

            dots.forEach((dot, index) => {
                if (dot.coords !== null) {
                    let _distance = distance(dot.coords, { x, y });
                    if (_distance < minDistance) {
                        minDistance = _distance;
                        minDistanceDotIndex = index;
                    }
                }
            });

            if (minDistanceDotIndex !== -1 && minDistance <= 15) {
                const newDots = [...dots];
                newDots[minDistanceDotIndex].coords = null;
                setDots(newDots);
            }
        }
    };

    const handlePreviewMouseMove = (y: number, x: number) => {
        // setMouseCoords({ x, y });
    };

    const scopeDraw = (ctx: CanvasRenderingContext2D) => {};

    return (
        <div className="Preview">
            <Header />
            <div className="Preview__container">
                <div className="canvas-container">
                    <PlotPreview
                        onClick={handlePreviewClick}
                        onMouseMove={handlePreviewMouseMove}
                    />
                </div>
                <aside className="sidebar">
                    <PlotScope draw={scopeDraw} />
                    <div className="sidebar__block">
                        <h4 className="sidebar__subtitle">Colors management</h4>
                        <div className="sidebar__block-color">
                            Background color
                            <ColorPicker />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
