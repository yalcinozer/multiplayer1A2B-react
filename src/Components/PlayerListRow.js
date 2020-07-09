import React from 'react';
import {brown, yellow} from '../Misc/Colors';


const PlayerListRow = (props) => {
    const color = props.inGame ? brown : yellow;

    return (
        <li
            onClick={props.onPress}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-around',
                padding: 8,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#gray'
            }}>
            <span style={{
                marginHorizontal: 7,
                padding: 8,
                flexBasis: 160,
                fontSize: 16,
                fontFamily: 'JandaManateeSolid'
            }}>{props.playerName}</span>
            <span style={{
                padding: 8,
                backgroundColor: color,
                fontSize: 16,
                fontFamily: 'JandaManateeSolid'
            }}>{props.inGame ? 'In Game' : 'Ready'}</span>
        </li>
    )
};

export default PlayerListRow;