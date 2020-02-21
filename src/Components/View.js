import React from 'react';

const View = (props) => {

    return (
        <div {...props}>
            {props.children}
        </div>
    )
}

export default View;