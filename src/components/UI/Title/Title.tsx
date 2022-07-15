import React from 'react';
import './style.css';

interface TitleProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    > {
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title: React.FC<TitleProps> = ({
    level,
    className,
    children,
    ...other
}) => {
    const Tag = `h${level}` as const;
    return (
        <Tag className={`Title ${className}`} {...other}>
            {children}
        </Tag>
    );
};
