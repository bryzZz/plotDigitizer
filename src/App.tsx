import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Upload, Preview } from './pages';
import './reset.css';
import './index.css';

interface AppProps {}

export const App: React.FC<AppProps> = (props) => {
    return (
        <div className="App">
            <Routes>
                <Route path="plotDigitizer/" element={<Upload />} />
                <Route path="plotDigitizer/preview" element={<Preview />} />
                <Route path="*" element={<Upload />} />
            </Routes>
        </div>
    );
};
