import React from 'react';
import {MySocket} from "../Misc/MySocket";
import '../Assets/Css/CustomStyle.css';


// Reusable keypad component.  It behaves differently depending on, which screen it is used in.
class Keypad extends React.Component {

    // randomGeneratedNumber = [1, 2, 3, 4];
    state = {
        number   : [],
        keyHeight: null,
    };

    componentDidMount() {
        this.setState({number: []});
    }

    gamescreen = () => {
        this.setState({number: []});
        const {a, b} = compareNumbers(this.state.number, MySocket.opponentNumber);
        this.props.gamescreenF([this.state.number, a, b]);
    };

    enteryournumber = () => {
        this.props.enteryournumberF(this.state.number)
    };

    // React Native version has an Training Game mode
    // This can be added to React version in the future.
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
                default:

            }
        }
    };

    render() {
        const keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9],
              comps  = [];

        // Get a current clone of entered number
        let number = [...this.state.number];

        //For Gameplay Screen. Disable button until opponent make another guess
        let isTickDisabled =
                this.props.isTickDisabled ?
                    {opacity: .3, pointerEvents: "none"} :
                    {opacity: 1, pointerEvents: "auto"};

        //On enter your number screen, disable keys after player choose own number.
        let isAllDisabled =
                this.props.isAllDisabled ?
                    {opacity: .4, pointerEvents: "none"} :
                    {opacity: 1, pointerEvents: "auto"};

        keypad.map((value) => {
            comps.push(
                <button
                    key={value}
                    onClick={() => {


                        if (number.indexOf(value) !== -1 || number.length === 4) {
                            return null;
                        }
                        number.push(value);
                        this.setState({number})
                    }}
                    className="Numkey">
                    <span className="NumkeyText">{value}</span>
                </button>)
        });

        comps.push(
            <button
                key="delete"
                onClick={() => {
                    const temp = number;
                    temp.pop();
                    this.setState({number: temp})
                }}
                className="Numkey"
            >
                <img src={require('../Assets/Images/backspace.png')} alt="backspace"
                     style={{width: ".85rem", height: ".85rem"}}/>
            </button>
        );

        comps.push(
            <button
                key="0"
                onClick={() => {
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
            </button>
        );

        comps.push(
            <button
                key="tick"
                onClick={this.tickButton}
                className="Numkey"
                style={isTickDisabled}>
                <img src={require('../Assets/Images/checked.png')} alt="checked"
                     style={{width: ".85rem", height: ".85rem"}}/>
            </button>
        );

        return (
            <div className="Keypad" style={isAllDisabled}>
                <div style={{flex: 1}}>
                    <div style={{
                        alignItems : 'center',
                        borderWidth: 2,
                        borderColor: "#dadada",
                        borderStyle: "solid",
                        margin     : "10px auto"
                    }}>
                        <span className="FourDigit">{this.state.number[0]}</span>
                        <span className="Filler"/>
                        <span className="FourDigit">{this.state.number[1]}</span>
                        <span className="Filler"/>
                        <span className="FourDigit">{this.state.number[2]}</span>
                        <span className="Filler"/>
                        <span className="FourDigit">{this.state.number[3]}</span>
                    </div>
                </div>
                <div style={{flex: 5, flexWrap: "wrap", justifyContent: "center"}}>
                    {comps}
                </div>
            </div>
        )
    }
}

export default Keypad;


function compareNumbers(guess, secretNumber) {
    let rightPos = 0,
        wrongPos = 0;
    let i = 0;
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
