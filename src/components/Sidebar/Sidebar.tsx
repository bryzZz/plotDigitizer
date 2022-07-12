import React from 'react';
import { MagneticButton, PlotScope } from '../index';
import { Colors } from './Colors';
import './style.css';

interface SidebarProps {
    onSubmit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSubmit }) => {
    return (
        <aside className="Sidebar">
            <PlotScope />
            <div className="Sidebar__block">
                <h4 className="Sidebar__subtitle">Colors management</h4>
                <Colors />
            </div>
            <MagneticButton
                className="Sidebar__submit"
                onClick={onSubmit}
                size="small"
            >
                Submit
            </MagneticButton>
        </aside>
    );
};
