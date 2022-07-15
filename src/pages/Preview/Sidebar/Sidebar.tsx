import React, { memo } from 'react';
import { Button } from '../../../components/UI';
import { PlotScope } from '../PlotScope/PlotScope';
import { PlotColors } from '../PlotColors/PlotColors';
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
                <PlotColors />
            </div>
            <Button className="Sidebar__submit" onClick={onSubmit} size="small">
                Submit
            </Button>
        </aside>
    );
});
