import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="Header">
            <div className="container">
                <Link to="/plotDigitizer" className="logo">
                    plotDigitazer
                </Link>
            </div>
        </header>
    );
};
