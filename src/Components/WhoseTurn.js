import React from 'react';
import {yellow, brown} from '../Misc/Colors';
import '../Assets/Css/CustomStyle.css';
import {MySocket} from "../Misc/MySocket";


const WhoseTurn = (props) => {

    let youStyle,
        opponentStyle,
        styleInFront = {
            transform: "scale(1)",
            left     : "36%",
            zIndex   : 1,
            opacity  : 1
        }
    if (props.yourTurn) {
        youStyle = styleInFront;
        opponentStyle = {}
    } else {
        opponentStyle = styleInFront;
        youStyle = {}
    }

    return (
        <>
            <div className="WhoseTurn" style={{
                backgroundColor: brown,
                color          : 'white',
                ...opponentStyle,
            }}>
                <span>{MySocket.opponentName}'s turn</span>
            </div>
            <div className="WhoseTurn" style={
                Object.assign({}, {
                    backgroundColor: yellow,
                }, youStyle)}>
                <span>Your turn</span>
            </div>
        </>
    )
};
export default WhoseTurn;
