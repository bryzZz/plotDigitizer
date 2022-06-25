import React from 'react';
import { useUploadStore } from '../store';
import { PlotPreview, PlotScope } from '../components';
import { distance, drawDot } from '../utils';
import { Button, Dot } from '../types';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = (props) => {
    const { dots, setDots } = useUploadStore();

    const handlePreviewClick = (
        ctx: CanvasRenderingContext2D,
        y: number,
        x: number,
        button: Button
    ) => {
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
                    console.log(_distance);

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

    return (
        <div className="Preview">
            <div className="canvas-container">
                <PlotPreview onClick={handlePreviewClick} />
            </div>
            <aside className="sidebar">
                <div className="sidebar__block">
                    <h4 className="sidebar__subtitle">Dots management</h4>
                </div>
            </aside>
            <PlotScope />
        </div>
    );
};
