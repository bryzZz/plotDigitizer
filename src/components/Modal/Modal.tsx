import React, { useEffect } from 'react';
import './style.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    show,
    onClose,
    className,
    children,
}) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handler);

        return () => document.removeEventListener('keydown', handler);
    }, []);
    return (
        <div
            className={`Modal__wrap ${show ? 'visible' : ''}`}
            onClick={onClose}
        >
            <div
                className={`Modal ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
