import React from "react";
import {withRouter} from "react-router-dom";
import {
    Text,
    View,
    ResultRow, WhoseTurn, Keypad, ChatWindow, TopBar
} from "../Assets/Components";
import "../Assets/CustomStyle.css";

class GameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.socket = this.props.socket;
    }

    state = {
        results: [],
        yourTurn: false,
        messages: []
    }

    componentDidMount() {

        this.socket.off('your-turn');
        this.socket.off('wait');
        this.socket.off('you-lost');
        this.socket.off('receive-message');

        this.socket.on('your-turn', () => {
            this.setState({yourTurn: true});
        })

        this.socket.on('wait', () => {
            this.setState({yourTurn: false});
        })

        this.socket.on('you-lost', () => {
            this.props.history.push({
                pathname: "/modalgameend",
                state: {results: this.state.results, isWinner: false, screen: "gamescreen"}
            })
        })

        this.socket.on('receive-message', this.mesajAl)
    }

    mesajAl = (data) => {
        const {messages} = this.state;
        messages.push([data[0], data[1]]);
        this.setState({messages})
    }

    callback = (dataFromKeypad) => {
        const {results} = this.state;
        results.push(dataFromKeypad);
        if (dataFromKeypad[1] === 4) {
            this.socket.emit('i-won');
            this.props.history.push({
                pathname: "/modalgameend",
                state: {results: this.state.results, isWinner: true, screen: "gamescreen"}
            })
            return;
        }
        this.setState({results});
        this.socket.emit('change-turn');
    }

    render() {

        const resultComps = this.state.results.map((value) => {
            return (
                <ResultRow number={value[0]} a={value[1]} b={value[2]}/>
            )
        });

        return (

            <View style={{flex: 1, flexDirection: "column"}}>
                <TopBar socket={this.socket}/>
                <View style={{flex: 1, flexDirection: "column", width: "100%"}}>
                    <View style={{
                        flex: 1,
                        position: "relative",
                        width: "100%",
                        minHeight: "70px",
                        justifyContent: "center"
                    }}>
                        <WhoseTurn socket={this.socket}
                                   yourTurn={this.state.yourTurn}/>
                    </View>
                    <View style={{flex: 5}}>
                        <View style={{flex: "2", flexDirection: "column",maxHeight:260,overflowY:"auto",width:"100%"}}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '900',
                                textDecorationLine: 'underline',
                                marginTop: 12
                            }}>Results</Text>
                            {resultComps}
                        </View>
                        <View style={{flex: "3", flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}>
                                    <Keypad isTickDisabled={!this.state.yourTurn}
                                            gamescreenF={this.callback}
                                            screen="gamescreen"
                                            socket={this.socket}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: "column", width: "100%"}}>
                    <ChatWindow style={{flex: 1, flexDirection: "column"}}
                                messages={this.state.messages}
                                socket={this.socket}
                    />
                </View>
            </View>
        )
    }
}

export default withRouter(GameScreen);
