import React from 'react';

interface PlotScopeProps {}

export const PlotScope: React.FC<PlotScopeProps> = (props) => {
    return (
        <div
            className="PlotScope"
            style={{ width: '250px', height: '250px', border: '1px solid red' }}
        ></div>
    );
};
