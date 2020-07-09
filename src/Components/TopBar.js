import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {MySocket} from "../Misc/MySocket";

const TopBar = (props) => {

    const location = useLocation();
    const history = useHistory();
    console.log(location.pathname);
    const sureToExit = () => {
        if (MySocket.hasOwnProperty("opponentID") && MySocket.opponentID !== null) {
            if (window.confirm("Are you sure you want to leave game exit?")) {
                MySocket.opponentID = null;
                history.entries.length = 0;
                history.push("/");
                MySocket.emit('leave-game');
            }
        } else {
            history.goBack();
        }
    }

    return (
        <div style={{justifyContent: "space-between", minHeight: 32, alignItems: "center"}}>
            <span onClick={sureToExit}>Back</span>
            {location.pathname === "/gamescreen" &&
            <span style={{color: "gray"}}>{MySocket.ownNumber}</span>
            }
        </div>
    )
}

export default TopBar;
