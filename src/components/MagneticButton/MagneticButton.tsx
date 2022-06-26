import React, { useRef } from 'react';
import './style.css';

interface MagneticButtonProps {
    className?: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    children: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    className,
    type,
    children,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const pos = buttonRef.current.getBoundingClientRect();
        const mx = e.clientX - pos.left - pos.width / 2;
        const my = e.clientY - pos.top - pos.height / 2;

        buttonRef.current.style.transform =
            'translate(' + mx * 0.15 + 'px, ' + my * 0.3 + 'px)';
        buttonRef.current.style.transform +=
            'rotate3d(' + mx * -0.1 + ', ' + my * -0.3 + ', 0, 12deg)';
        // buttonRef.current.children[0].style.transform =
        //     'translate(' + mx * 0.025 + 'px, ' + my * 0.075 + 'px)';
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current) return;

        buttonRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
        buttonRef.current.style.transform += 'rotate3d(0, 0, 0, 0deg)';
        // buttonRef.current.children[0].style.transform = 'translate3d(0px, 0px, 0px)';
    };

    return (
        <button
            ref={buttonRef}
            className={'MagneticButton ' + className || ''}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            type={type}
        >
            {children}
        </button>
    );
};
