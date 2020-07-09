import React from "react";
import {withRouter} from "react-router-dom";
import {PlayerListRow, TopBar} from '../Components/AllComponents';
import "../Assets/Css/CustomStyle.css";
import {MySocket} from "../Misc/MySocket";

class PlayerList extends React.Component {

    state = {
        playerList: {}
    }

    componentDidMount() {

        // Prevent listening same event multiple times
        MySocket.off('invitation');
        MySocket.off('invitation-accepted');
        MySocket.off('choose-your-number');
        MySocket.off('send-list');

        //Get playerlist from server on screen loaded
        MySocket.emit('request-list');

        MySocket.on('send-list', (data) => {
            this.setState({playerList: data});
            this.createList(this.state.playerList);
        });

        MySocket.on('invitation', (dataArr) => {

            if (window.confirm(dataArr[1] + " invites you to game")) {
                // If accepted
                MySocket.opponentID = dataArr[0];
                MySocket.emit('i-accepted-invitation', dataArr[0])
            }

        });

        MySocket.on('invitation-accepted', (data) => {
            MySocket.opponentID = data;
        })

        MySocket.on('choose-your-number', () => {
            this.props.history.entries.length = 2;
            this.props.history.push("/enteryournumber");
        })

    }

    createList = (veri) => {

        const rowsList = [];
        Object.keys(this.state.playerList).forEach((key) => {

            rowsList.push(
                <PlayerListRow
                    key={key}
                    id={key}
                    onPress={() => {
                        //Prevent calling players if its you or he/she is in-game
                        if (MySocket.id === key) return;
                        if (veri[key]['inGame']) return;
                        MySocket.emit('send-invitation', key);
                    }}
                    playerName={(MySocket.id === key) ? "You" : veri[key].playerName}
                    inGame={veri[key].inGame}/>
            )
        });
        return rowsList;
    }

    render() {

        return (
            <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
                <TopBar/>
                <div style={{flex: 1}}>
                    <p>Online players will be listed here. Tap on a player to invite her/him to a game*</p>
                </div>
                <div style={{flex: 8, maxHeight: 370, overflowY: "auto"}}>
                    <div style={{flex: 1, flexDirection: "column"}}>
                        {this.createList(this.state.playerList)}
                    </div>
                </div>
                <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <p style={{fontSize: 10}}>*Call a friend to test the app</p>
                </div>
            </div>
        );
    }
}

export default withRouter(PlayerList);
