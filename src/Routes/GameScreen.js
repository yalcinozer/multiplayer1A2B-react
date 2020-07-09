import React from "react";
import {withRouter} from "react-router-dom";
import {ResultRow, WhoseTurn, Keypad, ChatWindow, TopBar} from '../Components/AllComponents';
import {MySocket} from "../Misc/MySocket";
import "../Assets/Css/CustomStyle.css";
import {ResultsWrapper} from "../Components/ResultsWrapper";


class GameScreen extends React.Component {

    state = {
        results : [],
        yourTurn: false,
        messages: []
    }

    componentDidMount() {

        MySocket.off('your-turn');
        MySocket.off('wait');
        MySocket.off('you-lost');
        // MySocket.off('receive-message');

        MySocket.on('your-turn', () => {
            this.setState({yourTurn: true});
        })

        MySocket.on('wait', () => {
            this.setState({yourTurn: false});
        })

        MySocket.on('you-lost', () => {
            this.props.history.push({
                pathname: "/modalgameend",
                state   : {results: this.state.results, isWinner: false, screen: "gamescreen"}
            })
        })
    }

    callback = (dataFromKeypad) => {
        const temp = [...this.state.results];
        temp.push(dataFromKeypad);
        // If all numbers all are on right position, this means, Player found out the number
        if (dataFromKeypad[1] === 4) {
            MySocket.emit('i-won');
            this.props.history.push({
                pathname: "/modalgameend",
                state   : {results: this.state.results, isWinner: true, screen: "gamescreen"}
            })
            return;
        }
        this.setState({results: temp});
        MySocket.emit('change-turn');
    }

    render() {

        return (

            <div style={{flex: 1, flexDirection: "column"}}>
                <TopBar/>
                <div style={{flex: 1, flexDirection: "column", width: "100%"}}>

                    <div style={{
                        flex          : 1,
                        position      : "relative",
                        width         : "100%",
                        minHeight     : "70px",
                        justifyContent: "center"
                    }}>
                        <WhoseTurn yourTurn={this.state.yourTurn}/>
                    </div>
                    <div style={{flex: 5}}>
                        <div
                            style={{flex: "2", flexDirection: "column", maxHeight: 260, overflowY: "auto", width: "100%"}}>
                            <p style={{
                                textAlign         : 'center',
                                fontSize          : 18,
                                fontWeight        : '900',
                                textDecorationLine: 'underline',
                                marginTop         : 12
                            }}>Results</p>

                            <ResultsWrapper results={this.state.results}/>
                        </div>
                        <div style={{flex: "3", flexDirection: 'row'}}>
                            <div style={{flex: 1, alignItems: 'center'}}>
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems    : 'center',
                                    flexDirection : 'row',
                                    flexWrap      : 'wrap'
                                }}>
                                    <Keypad isTickDisabled={!this.state.yourTurn}
                                            gamescreenF={this.callback}
                                            screen="gamescreen"
                                            socket={this.socket}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{flex: 1, flexDirection: "column", width: "100%"}}>
                    <ChatWindow style={{flex: 1, flexDirection: "column"}}/>
                </div>
            </div>
        )
    }
}

export default withRouter(GameScreen);
