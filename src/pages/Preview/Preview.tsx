import React, { useState } from 'react';
import { Header, PlotPreview, PlotScope } from '../../components';
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';
import './style.css';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = () => {
    const [scale, setScale] = useState<number>(1);

    const changeScale = (diff: number) => {
        setScale((p) => +(p + diff).toFixed(2));
    };

    return (
        <div className="Preview">
            <Header />
            <div className="Preview__container">
                <div className="Preview__scale">
                    <button onClick={() => changeScale(-0.1)}>-</button>
                    <button onClick={() => changeScale(0.1)}>+</button>
                    <button onClick={() => setScale(1)}>100%</button>
                </div>
                <div className="canvas-container">
                    <PlotPreview scale={scale} />
                </div>
                <aside className="sidebar">
                    {/* <PlotScope draw={scopeDraw} /> */}
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
