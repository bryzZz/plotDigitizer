import React, { memo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadStore } from '../../../store/useUploadStore';
import './style.css';

interface DropzoneProps {}

export const Dropzone: React.FC<DropzoneProps> = memo(() => {
    const [classNames, setClassNames] = useState<string[]>(['Dropzone']);
    const setImageObjectURL = useUploadStore(
        (state) => state.setImageObjectURL
    );
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': ['.jpeg', '.png'] },
        maxFiles: 1,
        onDrop: ([file]) => {
            const url = URL.createObjectURL(file);
            setImageObjectURL(url);
        },
        onDragEnter: () => {
            setClassNames((prev) => [...prev, 'dragover']);
        },
        onDragLeave: () => {
            setClassNames((prev) => [prev[0]]);
        },
    });

    return (
        <div {...getRootProps({ className: classNames.join(' ') })}>
            <input {...getInputProps()} />
            <p>Drop plot image here, or click to select</p>
        </div>
    );
});
