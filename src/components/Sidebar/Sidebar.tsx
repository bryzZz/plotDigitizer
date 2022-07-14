import React, { memo } from 'react';
import { PlotScope } from '../index';
import { Button } from '../UI';
import { Colors } from './Colors';
import './style.css';

interface SidebarProps {
    onSubmit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = memo(({ onSubmit }) => {
    return (
        <aside className="Sidebar">
            <PlotScope />
            <div className="Sidebar__block">
                <h4 className="Sidebar__subtitle">Colors management</h4>
                <Colors />
            </div>
            <Button className="Sidebar__submit" onClick={onSubmit} size="small">
                Submit
            </Button>
        </aside>
    );
});
