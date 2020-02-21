import React from 'react';
import {View,TouchableOpacity} from './AllComponents';
import {compareNumbers} from '../Assets/HelperAndColors';
import '../Assets/CustomStyle.css';

class Keypad extends React.Component {

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
                <img src={require('../Assets/Images/backspace.png')} alt="backspace"
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
            <img src={require('../Assets/Images/checked.png')} alt="checked"
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

export default Keypad;