import React from 'react';
import { Modal } from '../Modal/Modal';

interface DatasetModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const DatasetModal: React.FC<DatasetModalProps> = ({
    isOpen,
    onRequestClose,
}) => {
    return (
        <Modal
            title="Dataset"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Dataset Modal"
        >
            dataset x y
        </Modal>
    );
};
