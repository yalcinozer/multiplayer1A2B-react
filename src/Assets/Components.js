import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import './CustomStyle.css';

const brown = "#4F2C1D",
    yellow = "#f9d342";

class View extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        )
    }
}

const Text = (props) => {
    return (
        <p {...props}>{props.children}</p>
    )
};

const TouchableOpacity = (props) => {
    return (
        <button className={props.className} style={props.style} onClick={props.onPress}>{props.children}</button>
    )
};

const GiantLetter = (props) => {
    return (
        <span className="GiantLetter" style={props.style}>{props.content}</span>
    )
};

const PlayerListRow = (props) => {
    const color = props.inGame ? brown : yellow;

    return (
        <li
            onClick={props.onPress}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-around',
                padding: 8,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#gray'
            }}>
            <span style={{
                marginHorizontal: 7,
                padding: 8,
                flexBasis: 160,
                fontSize: 16,
                fontFamily: 'JandaManateeSolid'
            }}>{props.playerName}</span>
            <span style={{
                padding: 8,
                backgroundColor: color,
                fontSize: 16,
                fontFamily: 'JandaManateeSolid'
            }}>{props.inGame ? 'In Game' : 'Ready'}</span>
        </li>
    )
};

class Keypad extends React.Component {

    constructor(props) {
        super(props);
    }

    // randomGeneratedNumber = [1, 2, 3, 4];
    state = {
        number: [],
        keyHeight: null,
    };

    componentDidMount() {
        this.setState({number: []});
    }

    gamescreen = () => {
        this.setState({number: []});
        const {a, b} = compareNumbers(this.state.number, this.props.socket.opponentNumber);
        this.props.gamescreenF([this.state.number, a, b]);
    };

    enteryournumber = () => {
        this.props.enteryournumberF(this.state.number)
    };

    // training = () => {
    //     this.setState({number: []});
    //     const {a, b} = compareNumbers(this.state.number, this.randomGeneratedNumber);
    //     this.props.trainingF([this.state.number, a, b]);
    // };

    tickButton = () => {
        if (this.state.number.length === 4) {
            switch (this.props.screen) {
                case "gamescreen":
                    this.gamescreen();
                    break;
                case "enteryournumber":
                    this.enteryournumber();
                    break;
                // case "training":
                //     this.training();
                //     break;
            }
        }
    };

    render() {
        const keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            comps = [],
            {number} = this.state,
            isTickDisabled = this.props.isTickDisabled ? {opacity: .3, pointerEvents: "none"} : {
                opacity: 1,
                pointerEvents: "auto"
            },
            isAllDisabled = this.props.isAllDisabled ? {opacity: .4, pointerEvents: "none"} : {
                opacity: 1,
                pointerEvents: "auto"
            };

        keypad.map((value) => {
            comps.push(
                <TouchableOpacity
                    onPress={() => {
                        const temp = number;
                        if (number.indexOf(value) !== -1 || number.length === 4) {
                            return;
                        }
                        temp.push(value);
                        this.setState({number: temp})
                    }}
                    className="Numkey">
                    <span className="NumkeyText">{value}</span>
                </TouchableOpacity>)
        });

        comps.push(
            <TouchableOpacity
                onPress={() => {
                    const temp = number;
                    temp.pop();
                    this.setState({number: temp})
                }}
                className="Numkey"
            >
                <img src={require('./Images/backspace.png')} alt="backspace"
                     style={{width: ".85rem", height: ".85rem"}}/>
            </TouchableOpacity>
        );

        comps.push(
            <TouchableOpacity
                onPress={() => {
                    let temp = number;
                    if (number.length === 0) {
                        return;
                    }
                    if (number.indexOf(0) !== -1 || number.length === 4) {
                        return;
                    }
                    temp.push(0);
                    this.setState({number: temp})
                }}
                className="Numkey">
                <span className="NumkeyText">0</span>
            </TouchableOpacity>
        );

        comps.push(<TouchableOpacity
            onPress={this.tickButton}
            className="Numkey"
            style={isTickDisabled}>
            <img src={require('./Images/checked.png')} alt="checked"
                 style={{width: ".85rem", height: ".85rem"}}/>
        </TouchableOpacity>);

        return (
            <View className="Keypad" style={isAllDisabled}>
                <View style={{flex: 1}}>
                    <View style={{
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: "#dadada",
                        borderStyle: "solid",
                        margin: "10px auto"
                    }}>
                        <span className="FourDigit">{this.state.number[0]}</span>
                        <span className="Filler"/>
                        <span className="FourDigit">{this.state.number[1]}</span>
                        <span className="Filler"/>
                        <span className="FourDigit">{this.state.number[2]}</span>
                        <span className="Filler"/>
                        <span className="FourDigit">{this.state.number[3]}</span>
                    </View>
                </View>
                <View style={{flex: 5, flexWrap: "wrap", justifyContent: "center"}}>
                    {comps}
                </View>
            </View>
        )
    }
}

class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    mesajGonder = () => {
        this.props.socket.emit('send-message', [this.props.socket.id, this.state.text]);
        this.setState({text: ""})
    };

    _handleChange = (e) => {
        this.setState({text: e.target.value});
    };

    render() {

        const messagesComps = this.props.messages.map((value) => {
            return (
                <ChatMessage from={value[0]} message={value[1]} socket={this.props.socket}/>
            )
        });

        return (
            <View style={this.props.style}>
                <div ref={(ref) => {
                    this.scrollable = ref
                }} style={{
                    flex: 3,
                    flexDirection: "column",
                    backgroundColor: '#cad9f2',
                    overflowY: "auto",
                    maxHeight: 160
                }}>
                    <p style={{textAlign: 'center', margin: 4}}>Have a chat with your
                        opponent</p>
                    {messagesComps}
                </div>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#abc2e7',
                    paddingHorizontal: 10
                }}>
                    <input style={{flex: 6, paddingBottom: 0, paddingTop: 0, textAlign: "left"}}
                           className="TextInput"
                           placeholder="Say something"
                           type="text"
                           value={this.state.text}
                           onChange={this._handleChange}/>
                    <TouchableOpacity
                        style={{flex: 2}}
                        onPress={this.mesajGonder}
                    >
                        <span style={{fontSize: "1rem"}}>Send</span>
                    </TouchableOpacity>
                </View>
                {this.scrollable ? this.scrollable.scrollBy(0, 80) : null}
            </View>
        )
    }
}

class ResultRow extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: '#dfdfdf',
                justifyContent: 'center'
            }}>
                <span style={{
                    fontSize: 18,
                    marginHorizontal: 12,
                    minWidth: 50,
                }}>{this.props.number}</span>
                <span style={{
                    fontSize: 18,
                    color: yellow,
                    marginRight: 8
                }}>{this.props.a}A</span>
                <span style={{
                    fontSize: 18,
                    color: brown
                }}>{this.props.b}B</span>
            </View>
        )
    }
}

class ChatMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const style1 = this.props.from === this.props.socket.id ? {
            justifyContent: 'flex-end',
        } : {justifyContent: 'flex-start'};
        const style2 = this.props.from === this.props.socket.id ? {
            backgroundColor: yellow,
        } : {backgroundColor: brown, color: "white"};

        return (
            <View style={style1}>
                <span className="ChatMessage" style={style2}>{this.props.message}</span>
            </View>
        )
    }
}


const WhoseTurn = (props) => {

    let youStyle, opponentStyle;
    if (props.yourTurn) {
        youStyle = {
            transform: "scale(1)",
            left: "36%",
            zIndex: 1,
            opacity: 1
        }
        opponentStyle = {}
    } else {
        opponentStyle = {
            transform: "scale(1)",
            left: "36%",
            zIndex: 1,
            opacity: 1
        };
        youStyle = {}
    }

    return (
        <>
            <View className="WhoseTurn" style={
                Object.assign({}, {
                    backgroundColor: brown,
                    color: 'white',
                }, opponentStyle)
            }>
                <Text>{props.socket.opponentName}'s turn</Text>
            </View>
            <View className="WhoseTurn" style={
                Object.assign({}, {
                    backgroundColor: yellow,
                }, youStyle)}>
                <Text>Your turn</Text>
            </View>
        </>
    )
};

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

export {
    Text,
    TouchableOpacity,
    GiantLetter,
    PlayerListRow,
    WhoseTurn,
    View,
    Keypad,
    ResultRow,
    ChatWindow,
    brown,
    yellow,
    TopBar
}

//Helper functions
function compareNumbers(guess, secretNumber) {
    var rightPos = 0, wrongPos = 0;
    var i = 0;
    for (i; i < 4; i++) {
        if (secretNumber.indexOf(guess[i]) >= 0) {
            if (secretNumber[i] === guess[i]) {
                rightPos++;
            } else {
                wrongPos++
            }
        }
    }
    return {
        a: rightPos,
        b: wrongPos
    }
}

// function numberGenerator() {
//     let secretNumber = [];
//     let potential;
//     while (secretNumber.length < 4) {
//         potential = Math.floor(Math.random() * 9);
//         if (potential === 0 && secretNumber.length === 0) continue;
//         if (secretNumber.indexOf(potential) === -1) {
//             secretNumber.push(potential);
//         }
//     }
//     return secretNumber;
// }
