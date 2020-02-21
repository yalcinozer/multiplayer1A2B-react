import React from 'react';
import { View, Text } from './AllComponents';
import { yellow, brown } from '../Misc/Colors';
import '../Assets/Css/CustomStyle.css';


const WhoseTurn = (props) => {

    let youStyle,
        opponentStyle,
        styleInFront = {
            transform: "scale(1)",
            left: "36%",
            zIndex: 1,
            opacity: 1
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