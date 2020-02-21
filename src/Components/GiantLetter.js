import React from 'react';
import './CustomStyle.css';

const GiantLetter = (props) => {
    return (
        <span className="GiantLetter" style={props.style}>{props.content}</span>
    )
};

export default GiantLetter;