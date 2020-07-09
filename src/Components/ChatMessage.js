import React from 'react';
import {MySocket} from "../Misc/MySocket";
import {yellow, brown} from '../Misc/Colors';

/**
 * Single message component
 * @param from
 * @param message
 * @returns {*}
 * @constructor
 */
const ChatMessage = ({from, message}) => {

    //Position of element changes depending on who sent it
    const style1 =
              from === MySocket.id ?
                  {justifyContent: 'flex-end'} :
                  {justifyContent: 'flex-start'};

    //Background-color also changes
    const style2 =
              from === MySocket.id ?
                  {backgroundColor: yellow} :
                  {backgroundColor: brown, color: "#fff"};

    return (
        <div style={style1}>
            <span className="ChatMessage" style={style2}>{message}</span>
        </div>
    )
}
export default ChatMessage;
