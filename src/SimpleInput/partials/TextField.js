/** @format */
import React from 'react';

const TextField = ({ children, text, ns, className }) => {
    if (!children || !children.length)
        return <span className={className}>{text}</span>;

    const childrenWithExtraProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
            className: className,
            text: text,
            ns: ns
        });
    });
    return childrenWithExtraProps;
};

TextField.displayName = 'TextField';

export default TextField;
