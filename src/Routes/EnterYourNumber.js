import React from "react";
import {withRouter} from "react-router-dom";
import {Keypad, TopBar} from '../Components/AllComponents';
import {MySocket} from "../Misc/MySocket";
import "../Assets/Css/CustomStyle.css";

class EnterYourNumber extends React.Component {

    state = {
        isAllDisabled: false,
    };

    componentDidMount() {

        MySocket.off('game-has-started');
        MySocket.off('opponent-choosed-a-number');
        MySocket.off('opponent-left-game');

        MySocket.on('opponent-choosed-a-number', (data) => {
            MySocket.opponentNumber = data[0];
            MySocket.opponentName = data[1];
        });

        MySocket.on('game-has-started', () => {
            this.props.history.push("/gamescreen");
        });

        MySocket.on('opponent-left-game', () => {
            MySocket.opponentID = null;
            alert("Your opponent has left Game. You will be directed to Home Screen");
            this.props.history.entries.length = 0;
            this.props.history.push("/");
        });
    }

    callback = (param) => {
        MySocket.emit('choosed-my-number', param);
        MySocket.ownNumber = param;
        this.setState({
            isAllDisabled: true
        })
    };

    render() {

        return (
            <div style={{flex: 1, flexDirection: "column"}}>
                <TopBar socket={this.socket}/>
                <div style={{flex: 1}}>
                    <p>
                        Choose a number for <span style={{fontWeight: '800'}}>YOURSELF.</span> Your opponent
                        will try to
                        find that number. All digits must be different.
                    </p>
                </div>
                <div style={{flex: 4, justifyContent: 'center'}}>
                    <Keypad
                        isAllDisabled={this.state.isAllDisabled}
                        enteryournumberF={this.callback}
                        screen="enteryournumber"/>
                </div>
                <div style={{flex: 2, justifyContent: "center", alignItems: "flex-end"}}>
                    <p style={{
                        textAlign     : 'center',
                        fontSize      : 20,
                        marginVertical: 5,
                        opacity       : this.state.isAllDisabled ? 1 : 0
                    }}>Waiting For Opponent...</p>
                </div>
            </div>
        )
    }
}

export default withRouter(EnterYourNumber);
