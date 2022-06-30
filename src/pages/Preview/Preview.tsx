import React, { useEffect, useRef, useState } from 'react';
import { Header, PlotPreview, PlotScope } from '../../components';
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';
import { useUploadStore } from '../../store/useUploadStore';
import { Button } from '../../types';
import { distance } from '../../utils';
import './style.css';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = () => {
    const [scale, setScale] = useState<number>(1);
    const [color, setColor] = useState<string>('');
    const [isEyedrop, setIsEyedrop] = useState<boolean>(false);
    const [imageObjectURL, dots, setDots] = useUploadStore((state) => [
        state.imageObjectURL,
        state.dots,
        state.setDots,
    ]);
    const { current: img } = useRef(new Image());
    const imgRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<HTMLCanvasElement>(null);
    const scopeRef = useRef<HTMLCanvasElement>(null);

    img.src = imageObjectURL;
    const canvasWidth = img.width;
    const canvasHeight = img.width;

    const changeScale = (diff: number) => {
        setScale((p) => +(p + diff).toFixed(2));
    };

    const handleClick = (x: number, y: number, button: Button) => {
        if (button === Button.Left && isEyedrop) {
            const imgContext = imgRef.current!.getContext('2d');
            const [r, g, b] = imgContext!.getImageData(x, y, 1, 1).data;
            setColor(`rgb(${r}, ${g}, ${b})`);
            return;
        }

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
            return;
        }
        // if button right -> find dot with minimal distance and delete
        if (button === Button.Right) {
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

    const handleMouseMove = (x: number, y: number) => {
        const scopeContext = scopeRef.current!.getContext('2d');

        const gscale = 3;
        const g = 250;

        scopeContext!.drawImage(
            imgRef.current!,
            x - g / gscale / 2,
            y - g / gscale / 2,
            g / gscale,
            g / gscale,
            0,
            0,
            g,
            g
        );
        scopeContext!.drawImage(
            dotsRef.current!,
            x - g / gscale / 2,
            y - g / gscale / 2,
            g / gscale,
            g / gscale,
            0,
            0,
            g,
            g
        );

        scopeContext!.beginPath();
        scopeContext!.strokeStyle = 'tomato';
        scopeContext!.moveTo(g / 2, 0);
        scopeContext!.lineTo(g / 2, 250);
        scopeContext!.moveTo(0, g / 2);
        scopeContext!.lineTo(250, g / 2);
        scopeContext!.stroke();
        scopeContext!.closePath();
    };

    useEffect(() => {
        const context = imgRef.current!.getContext('2d');

        img.addEventListener(
            'load',
            () => {
                console.log('PlotImage update img');
                context!.drawImage(img, 0, 0);
                const imageData = context!.getImageData(
                    0,
                    0,
                    canvasWidth,
                    canvasHeight
                );

                // setTimeout(() => {
                //     const colors = getColors(imageData.data);
                //     setImageColors(colors.splice(0, 5));
                // }, 0);
            },
            { once: true }
        );
    }, [img]);

    useEffect(() => {
        const context = dotsRef.current!.getContext('2d');
        const radius = 5;

        context!.clearRect(0, 0, canvasWidth * scale, canvasHeight * scale);
        dots.forEach(({ coords, color, label }) => {
            if (!coords) return;
            const y = coords.y * scale,
                x = coords.x * scale;

            context!.beginPath();

            context!.fillStyle = color;
            context!.textAlign = 'center';
            context!.font = `400 14px Roboto`;
            context!.fillText(label, x, y - radius * 2);
            context!.arc(x, y, radius, 0, Math.PI * 2);
            context!.fill();

            context!.closePath();
        });
    }, [dots, scale]);

    // useEffect(() => {
    //     console.log('Preview update');
    // });

    return (
        <div className="Preview">
            <Header />
            <div className="Preview__container container">
                <div className="Preview__scale">
                    <button onClick={() => changeScale(-0.1)}>-</button>
                    <button onClick={() => changeScale(0.1)}>+</button>
                    <button onClick={() => setScale(1)}>100%</button>
                </div>
                <div className="canvas-container">
                    <PlotPreview
                        scale={scale}
                        width={canvasWidth}
                        height={canvasHeight}
                        imgRef={imgRef}
                        dotsRef={dotsRef}
                        onClick={handleClick}
                        onMouseMove={handleMouseMove}
                    />
                </div>
                <aside className="sidebar">
                    <PlotScope ref={scopeRef} />
                    <div className="sidebar__block">
                        <h4 className="sidebar__subtitle">Colors management</h4>
                        <div className="sidebar__block-color">
                            Background color
                            <ColorPicker color={color} />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
