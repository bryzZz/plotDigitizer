import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Header,
    PlotPreview,
    PlotScope,
    ColorPicker,
    MagneticButton,
} from '../../components';
import { useGetColor } from '../../hooks/useGetColor';
import { useUploadStore } from '../../store/useUploadStore';
import { Button } from '../../types';
import { distance } from '../../utils';
import './style.css';

interface PreviewProps {}

export const Preview: React.FC<PreviewProps> = () => {
    const [imageObjectURL, dots, plotType, setDots] = useUploadStore(
        (state) => [
            state.imageObjectURL,
            state.dots,
            state.plotType,
            state.setDots,
        ]
    );
    const navigate = useNavigate();
    const { run: getDominantColors, result: dominantColors } = useGetColor();
    const [scale, setScale] = useState<number>(1);
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [foregroundColors, setForegroundColors] = useState<string[]>(['']);
    const [isEyedrop, setIsEyedrop] = useState<boolean>(false);
    const { current: img } = useRef(new Image());
    const { current: mouseCoords } = useRef({ x: 0, y: 0 });
    const imgRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<HTMLCanvasElement>(null);
    const scopeRef = useRef<HTMLCanvasElement>(null);

    img.src = imageObjectURL;
    const canvasWidth = img.width;
    const canvasHeight = img.height;

    const changeScale = (diff: number) => {
        setScale((p) => +(p + diff).toFixed(2));
    };

    const handleClick = (button: Button) => {
        const { x, y } = mouseCoords;
        if (button === Button.Left && isEyedrop) {
            const imgContext = imgRef.current!.getContext('2d');
            const [r, g, b] = imgContext!.getImageData(x, y, 1, 1).data;
            setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
            setIsEyedrop(false);
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

            for (let i = dots.length - 1; i >= 0; i--) {
                const dot = dots[i];
                if (dot.coords !== null) {
                    let _distance = distance(dot.coords, { x, y });
                    if (_distance < minDistance) {
                        minDistance = _distance;
                        minDistanceDotIndex = i;
                    }
                }
            }

            if (minDistanceDotIndex !== -1 && minDistance <= 15) {
                const newDots = [...dots];
                newDots[minDistanceDotIndex].coords = null;
                setDots(newDots);
            }
        }
    };

    const handleMouseMove = (x: number, y: number) => {
        Object.assign(mouseCoords, { x, y });
        scopeDraw();
    };

    const handleChangeForegroundColor = (color: string, index: number) => {
        const currentColors = [...foregroundColors];
        currentColors[index] = color;
        setForegroundColors(currentColors);
    };

    const handleSubmit = () => {
        const body = {
            image: imgRef!.current
                ?.toDataURL()
                .replace(/^data:image\/(png|jpg);base64,/, ''),
            type: plotType,
            color: [foregroundColors[0], backgroundColor],
            dots: dots,
        };
        fetch('https://webplotdigitizer2049.herokuapp.com/', {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                alert(res);
            });
    };

    const scopeDraw = () => {
        const { x, y } = mouseCoords,
            scopeContext = scopeRef.current!.getContext('2d'),
            scopeScale = 5,
            size = 240;

        // draw scope from image
        scopeContext!.drawImage(
            imgRef.current!,
            x - size / scopeScale / 2,
            y - size / scopeScale / 2,
            size / scopeScale,
            size / scopeScale,
            0,
            0,
            size,
            size
        );
        // draw scope from dots
        scopeContext!.drawImage(
            dotsRef.current!,
            x * scale - (size * scale) / scopeScale / 2,
            y * scale - (size * scale) / scopeScale / 2,
            (size * scale) / scopeScale,
            (size * scale) / scopeScale,
            0,
            0,
            size,
            size
        );

        // draw cross lines
        scopeContext!.beginPath();
        scopeContext!.strokeStyle = 'var(--color-border)';
        scopeContext!.lineWidth = 0.5;
        scopeContext!.moveTo(size / 2, 0);
        scopeContext!.lineTo(size / 2, size);
        scopeContext!.moveTo(0, size / 2);
        scopeContext!.lineTo(size, size / 2);
        scopeContext!.stroke();
        scopeContext!.closePath();
    };

    useEffect(() => {
        if (!imageObjectURL) {
            navigate('/plotDigitizer/');
            return;
        }
    }, [imageObjectURL]);

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

                getDominantColors(imageData.data);
            },
            { once: true }
        );

        scopeDraw();
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
        scopeDraw();
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
                        className={isEyedrop ? 'eyedrop' : ''}
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
                            <ColorPicker
                                color={backgroundColor}
                                variants={dominantColors}
                                onChange={setBackgroundColor}
                                onEyedrop={() => setIsEyedrop(true)}
                            />
                            Foreground color
                            {foregroundColors.map((foregroundColor, i) => (
                                <ColorPicker
                                    key={foregroundColor}
                                    color={foregroundColor}
                                    variants={dominantColors}
                                    onChange={(color) =>
                                        handleChangeForegroundColor(color, i)
                                    }
                                    onEyedrop={() => setIsEyedrop(true)}
                                />
                            ))}
                        </div>
                    </div>
                    <MagneticButton className="fill" onClick={handleSubmit}>
                        Submit
                    </MagneticButton>
                </aside>
            </div>
        </div>
    );
};
