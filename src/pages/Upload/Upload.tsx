import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadStore } from '../../store/useUploadStore';
import { plotTypes } from '../../data/plotTypes';
import { Header } from '../../components';
import { Button, Title } from '../../components/UI';
import { PlotTypes } from './PlotTypes/PlotTypes';
import { Dropzone } from './Dropzone/Dropzone';
import { ImgPreview } from './ImgPreview/ImgPreview';
import './style.css';

interface UploadProps {}

export const Upload: React.FC<UploadProps> = () => {
    const [imageObjectURL, plotType, setDots] = useUploadStore((state) => [
        state.imageObjectURL,
        state.plotType,
        state.setDots,
    ]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        imageObjectURL: '',
        plotType: '',
    });

    const checkErrors = () => {
        let flag = false;

        if (imageObjectURL === '') {
            setErrors((prev) => ({
                ...prev,
                imageObjectURL: '* this field is required',
            }));
            flag = true;
        }
        if (plotType === '') {
            setErrors((prev) => ({
                ...prev,
                plotType: '* this field is required',
            }));
            flag = true;
        }

        return flag;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkErrors()) {
            setDots(plotTypes[plotType].dots); // set dots for plot type
            navigate('preview');
        }
    };

    return (
        <div className="Upload">
            <Header />
            <div className="container container--upload">
                <form className="Upload__form" onSubmit={handleSubmit}>
                    <div className="Upload__form-block">
                        <Title className="Upload__subtitle" level={2}>
                            Choose your plot image
                        </Title>
                        <Dropzone />
                        <span className="Upload__error">
                            {errors.imageObjectURL}
                        </span>
                        <ImgPreview />
                    </div>
                    <div className="Upload__form-block">
                        <Title className="Upload__subtitle" level={2}>
                            Choose your plot type
                        </Title>
                        <PlotTypes />
                        <span className="Upload__error">{errors.plotType}</span>
                        <Button
                            className="Upload__submit fill"
                            type="submit"
                            isMagnetic={true}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
