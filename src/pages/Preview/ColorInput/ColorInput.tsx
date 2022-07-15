import React from 'react';
import { RGB } from '../../../types';
import { clamp } from '../../../utils';
import './style.css';

interface ColorInputProps {
    // variant: ColorVariant;
    className?: string;
    value: RGB;
    onChange: (value: React.SetStateAction<RGB>) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({
    value,
    onChange,
    className,
    // variant,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange((prev) => {
            const n = +e.target.value;
            if (!isNaN(n)) {
                return {
                    ...prev,
                    [e.target.name]: clamp(0, n, 255),
                };
            }
            return prev;
        });
    };

    return (
        <div className={`ColorInput ${className}`}>
            <label>
                R:{' '}
                <input
                    onChange={handleChange}
                    value={value.r}
                    type="text"
                    name="r"
                />
            </label>
            <label>
                G:{' '}
                <input
                    onChange={handleChange}
                    value={value.g}
                    type="text"
                    name="g"
                />
            </label>
            <label>
                B:{' '}
                <input
                    onChange={handleChange}
                    value={value.b}
                    type="text"
                    name="b"
                />
            </label>
        </div>
    );
    // if (variant === 'RGB') {

    // }

    // const hexRef = useRef<HTMLInputElement>(null);
    // if (variant === 'HEX') {
    //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         const rgbColor = hexToRgb(e.target.value);
    //         onChange(rgbColor!);
    //     };

    //     return (
    //         <div className="ColorInput">
    //             <input
    //                 // value={rgbToHex(value)}
    //                 // onChange={handleChange}
    //                 ref={hexRef}
    //                 type="text"
    //             />
    //         </div>
    //     );
    // }

    // if (variant === 'HSL') {
    //     const { h, s, l } = RGBToHSL(value);

    //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         onChange({ ...value, [e.target.name]: e.target.value });
    //     };

    //     return (
    //         <div className="ColorInput">
    //             <input value={h} onChange={handleChange} type="text" />
    //             <input value={s} onChange={handleChange} type="text" />
    //             <input value={l} onChange={handleChange} type="text" />
    //         </div>
    //     );
    // }
};
