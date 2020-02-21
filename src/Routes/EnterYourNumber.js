import React from "react";
import { withRouter } from "react-router-dom";
import {
    Text,
    View,
    Keypad,
    TopBar
} from '../Components/AllComponents';
import "../Assets/Css/CustomStyle.css";

class EnterYourNumber extends React.Component {

    constructor(props) {
        super(props);
        this.socket = this.props.socket;
    }

    state = {
        isAllDisabled: false,
    };

    componentDidMount() {
        
        this.socket.off('game-has-started');
        this.socket.off('opponent-choosed-a-number');
        this.socket.off('opponent-left-game');

        this.socket.on('opponent-choosed-a-number', (data) => {
            this.socket.opponentNumber = data[0];
            this.socket.opponentName = data[1];
        });

        this.socket.on('game-has-started', () => {
            this.props.history.push("/gamescreen");
        });

        this.socket.on('opponent-left-game', () => {
            this.socket.opponentID = null;
            alert("Your opponent has left Game. You will be directed to Home Screen");
            this.props.history.entries.length = 0;
            this.props.history.push("/");
        });
    }

    callback = (param) => {
        this.socket.emit('choosed-my-number', param);
        this.setState({
            isAllDisabled: true
        })
    };

    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <TopBar socket={this.socket} />
                <View style={{ flex: 1 }}>
                    <Text>
                        Choose a number for <span style={{ fontWeight: '800' }}>YOURSELF.</span> Your opponent will try to
                        find that number. All digits must be different.
                    </Text>
                </View>
                <View style={{ flex: 4, justifyContent: 'center' }}>
                    <Keypad
                        isAllDisabled={this.state.isAllDisabled}
                        enteryournumberF={this.callback}
                        screen="enteryournumber" socket={this.socket} />
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        marginVertical: 5,
                        opacity: this.state.isAllDisabled ? 1 : 0
                    }}>Waiting For Opponent...</Text>
                </View>
            </View>
        )
    }
}

export default withRouter(EnterYourNumber);
