import React from 'react';

const TouchableOpacity = (props) => {
    return (
        <button className={props.className} style={props.style} onClick={props.onPress}>{props.children}</button>
    )
};

export default TouchableOpacity;