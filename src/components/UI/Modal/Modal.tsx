import React from 'react';
import ReactModal from 'react-modal';
import './style.css';

interface ModalProps extends ReactModal.Props {
    title: string;
}

ReactModal.setAppElement('#root');

export const Modal: React.FC<ModalProps> = ({
    title,
    children,
    className = '',
    overlayClassName = '',
    ...other
}) => {
    return (
        <ReactModal
            className={`Modal ${className}`}
            overlayClassName={`Modal__overlay ${overlayClassName}`}
            {...other}
        >
            <header className="Modal__header">
                <h1 className="Modal__title">{title}</h1>
            </header>
            <main className="Modal__main">{children}</main>
        </ReactModal>
    );
};
