import React from 'react';
import './style.css';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="Header">
            <div className="container">
                <span className="logo">plotDigitazer</span>
            </div>
        </header>
    );
};
