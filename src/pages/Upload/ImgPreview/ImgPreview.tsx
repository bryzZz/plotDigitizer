import React, { memo } from 'react';
import { useUploadStore } from '../../../store/useUploadStore';
import './style.css';

interface ImgPreviewProps {}

export const ImgPreview: React.FC<ImgPreviewProps> = memo(() => {
    const imageObjectURL = useUploadStore((state) => state.imageObjectURL);

    return (
        <div className="ImgPreview">
            {imageObjectURL && (
                <>
                    <span>Preview:</span>
                    <img src={imageObjectURL} />
                </>
            )}
        </div>
    );
});
