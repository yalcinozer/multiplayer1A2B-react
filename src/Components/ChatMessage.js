import React from 'react';
import { View } from './AllComponents';
import { yellow, brown } from '../Misc/Colors';

const ChatMessage = (props) => {

    //Position of element changes depending who sent it
    const style1 = props.from === props.socket.id ? {
        justifyContent: 'flex-end',
    } : { justifyContent: 'flex-start' };

    //Background-color also changes
    const style2 = props.from === props.socket.id ? {
        backgroundColor: yellow,
    } : { backgroundColor: brown, color: "#fff" };

    return (
        <View style={style1}>
            <span className="ChatMessage" style={style2}>{props.message}</span>
        </View>
    )
}
export default ChatMessage;