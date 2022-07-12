import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = memo((props) => {
    return (
        <header className="Header">
            <div className="container">
                <Link to="/plotDigitizer" className="logo">
                    plotDigitizer
                </Link>
            </div>
        </header>
    );
});
