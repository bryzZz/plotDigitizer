import React, { useState } from 'react';
import { Dataset } from '../../types';
import { Modal } from '../UI';
import './style.css';

interface DatasetModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    dataset: Dataset;
}

export const DatasetModal: React.FC<DatasetModalProps> = ({
    isOpen,
    onRequestClose,
    dataset,
}) => {
    const [separator, setSeparator] = useState<string>(', ');

    const handleChangeSeparator = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeparator(e.target.value);
    };

    return (
        <Modal
            className="DatasetModal"
            title="Dataset"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Dataset Modal"
        >
            <div className="DatasetModal__container">
                <div className="DatasetModal__dataset">
                    <h1 className="DatasetModal__dataset-title">
                        Variables: {Object.keys(dataset).join(', ')}
                    </h1>
                    <div className="DatasetModal__dataset-variables">
                        {Object.keys(dataset).map((variable, i) => (
                            <div
                                key={i}
                                className="DatasetModal__dataset-variable"
                            >
                                {dataset[variable].join(separator)}
                            </div>
                        ))}
                    </div>
                </div>
                <aside className="DatasetModal__sidebar">
                    <h2 className="DatasetModal__sidebar-title">Sort</h2>
                    <h2 className="DatasetModal__sidebar-title">Format</h2>
                    <label>
                        Column separator:
                        <input
                            value={separator}
                            onChange={handleChangeSeparator}
                            type="text"
                        />
                    </label>
                </aside>
            </div>
        </Modal>
    );
};
