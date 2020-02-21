import React from "react";
import {withRouter} from "react-router-dom";

import {Text, PlayerListRow, View, TopBar} from '../Components/AllComponents';
import "../Assets/Css/CustomStyle.css";

class PlayerList extends React.Component {

    constructor(props) {
        super(props);
        this.socket = this.props.socket;
    }

    state = {
        playerList: {}
    }

    componentDidMount() {

        this.socket.off('request-list');
        this.socket.off('invitation');
        this.socket.off('invitation-accepted');
        this.socket.off('choose-your-number');
        this.socket.off('send-list');

        //Get playerlist from server on screen loaded
        this.socket.emit('request-list');

        this.socket.on('send-list', (data) => {
            this.setState({playerList: data});
            this.createList(this.state.playerList);
        });

        this.socket.on('invitation', (dataArr) => {
            if (window.confirm(dataArr[1] + " invites you to game")) {
                this.socket.opponentID = dataArr[0];
                this.socket.emit('i-accepted-invitation', dataArr[0])
            }
        });

        this.socket.on('invitation-accepted', (data) => {
            this.socket.opponentID = data;
        })

        this.socket.on('choose-your-number', () => {
            this.props.history.entries.length = 2;
            this.props.history.push("/enteryournumber");
        })
    }

    createList = (veri) => {
        const rowsList = [];
        Object.keys(this.state.playerList).forEach((key) => {
            rowsList.push(<PlayerListRow key={key} id={key} onPress={() => {
                //Prevent calling players if its you or its in-game 
                if (this.socket.id === key) return;
                if (veri[key]['inGame']) return;
                this.socket.emit('send-invitation', key);
            }} playerName={(this.socket.id === key) ? "You" : veri[key].playerName} inGame={veri[key].inGame}/>)
        });
        return rowsList;
    }

    render() {

        return (
            <View style={{display: "flex", flex: 1, flexDirection: "column"}}>
                <TopBar socket={this.socket}/>
                <View style={{flex: 1}}>
                    <Text>Online players will be listed here. Tap on a player to invite her/him to a game*</Text>
                </View>
                <View style={{flex: 8, maxHeight: 370, overflowY: "auto"}}>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        {this.createList(this.state.playerList)}
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 10}}>*Call a friend to test the app</Text>
                </View>
            </View>
        );
    }
}

export default withRouter(PlayerList);
