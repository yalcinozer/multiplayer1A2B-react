import React from 'react';
import {useHistory} from "react-router-dom";

const TopBar = (props) => {

    const history = useHistory();
    const sureToExit = () => {
        if (props.socket.hasOwnProperty("opponentID") && props.socket.opponentID !== null) {
            if (window.confirm("Are you sure you want to leave game exit?")) {
                props.socket.opponentID = null;
                history.entries.length = 0;
                history.push("/");
                props.socket.emit('leave-game');
            }
        } else {
            history.goBack();
        }
    }

    return (
        <div style={{flex: 0, minHeight: 32, alignItems: "center"}}>
            <span onClick={sureToExit}>Back</span>
        </div>
    )
}

export default TopBar;