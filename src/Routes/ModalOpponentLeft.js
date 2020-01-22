import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {
    Text,
    brown,
    yellow,
    secretNumberStyle,
    PlayerListRow,
    View,
    GiantLetter,
    TouchableOpacity, ResultRow, WhoseTurn, Keypad, ChatWindow
} from "../Assets/Components";
import "../Assets/CustomStyle.css";


class ModalOpponentLeft extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        seconds: 3
    }

    componentDidMount() {
        this.opponentLeftGame();
    }

    opponentLeftGame = () => {
        var threeSeconds = setInterval(() => {
            this.setState({ seconds: this.state.seconds - 1 })
        }, 1000);
        setTimeout(() => {
            this.props.navigation.navigate('playerlist');
            clearInterval(threeSeconds);
        }, 3000)
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: "80%" }}>
                    <Text style={h2}>INFO</Text>
                    <Text style={[p, { fontSize: receiveRem(18) }]}>Your Opponent left the game. You will be directed to 'Players List' screen in {this.state.seconds} seconds</Text>
                </View>
            </View>
        )
    }
}

export default withRouter(ModalOpponentLeft);
