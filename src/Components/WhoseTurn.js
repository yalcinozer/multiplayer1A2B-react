import React from 'react';
import {View,Text} from './AllComponents';
import {yellow, brown} from '../Assets/HelperAndColors';
import '../Assets/CustomStyle.css';


const WhoseTurn = (props) => {

    let youStyle, opponentStyle;
    if (props.yourTurn) {
        youStyle = {
            transform: "scale(1)",
            left: "36%",
            zIndex: 1,
            opacity: 1
        }
        opponentStyle = {}
    } else {
        opponentStyle = {
            transform: "scale(1)",
            left: "36%",
            zIndex: 1,
            opacity: 1
        };
        youStyle = {}
    }

    return (
        <>
            <View className="WhoseTurn" style={
                Object.assign({}, {
                    backgroundColor: brown,
                    color: 'white',
                }, opponentStyle)
            }>
                <Text>{props.socket.opponentName}'s turn</Text>
            </View>
            <View className="WhoseTurn" style={
                Object.assign({}, {
                    backgroundColor: yellow,
                }, youStyle)}>
                <Text>Your turn</Text>
            </View>
        </>
    )
};
export default WhoseTurn;