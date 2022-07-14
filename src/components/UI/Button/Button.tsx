import React, { useRef } from 'react';
import './style.css';

interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    size?: 'small' | 'medium' | 'big';
    fillType?: 'fill' | 'stroke';
    isMagnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className = '',
    children,
    size = 'medium',
    fillType = 'fill',
    isMagnetic = false,
    ...other
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current || !isMagnetic) return;

        const pos = buttonRef.current.getBoundingClientRect();
        const mx = e.clientX - pos.left - pos.width / 2;
        const my = e.clientY - pos.top - pos.height / 2;

        buttonRef.current.style.transform =
            'translate(' + mx * 0.15 + 'px, ' + my * 0.3 + 'px)';
        buttonRef.current.style.transform +=
            'rotate3d(' + mx * -0.1 + ', ' + my * -0.3 + ', 0, 12deg)';
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current || !isMagnetic) return;

        buttonRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
        buttonRef.current.style.transform += 'rotate3d(0, 0, 0, 0deg)';
    };

    return (
        <button
            ref={buttonRef}
            className={`Button Button__${size} Button__${fillType} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...other}
        >
            {children}
        </button>
    );
};
