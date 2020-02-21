import React from "react";
import { withRouter } from "react-router-dom";

import {
    Text,
    View,
    TouchableOpacity,
    ResultRow,
} from '../Components/AllComponents';
import "../Assets/Css/CustomStyle.css";

class ModalGameEnd extends React.Component {

    constructor(props) {
        super(props);
        this.socket = this.props.socket;
    }

    componentDidMount() {
        this.socket.off("choose-your-number");
        this.socket.on("choose-your-number", () => {
            this.props.history.entries.length = 2;
            this.props.history.push("/enteryournumber");
        });
    }

    render() {

        const { results, isWinner, screen } = this.props.location.state;
        const resultComponents = results.map((value) => {
            return (
                <ResultRow textColor='white' number={value[0]} a={value[1]} b={value[2]}></ResultRow>
            )
        });

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <img src={require('../Assets/Images/logo.png')} alt="yalcin ozer" style={{ width: 150, height: 150 }} />
                    <Text style={{ textAlign: 'center', marginBottom: 2, marginTop: 2 }}>{isWinner ? 'Congratulations' : 'You lose'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>The Secret number is </Text><Text className="SecretNumberStyle">{screen === "gamescreen" ? this.socket.opponentNumber : 1234}</Text>
                    </View>
                    <View style={{ flexDirection: "column", maxHeight: 140, overflowY: "auto" }}>
                        {resultComponents}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 8 }}>
                        {screen === "gamescreen" ?
                            <TouchableOpacity
                                onPress={() => { this.socket.emit('send-invitation', this.socket.opponentID) }}
                                style={{ minWidth: 60, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center' }}>Invite to new game</Text>
                            </TouchableOpacity> : <TouchableOpacity
                                onPress={() => { this.props.navigation.goBack(null) }}
                                style={{ minWidth: 80, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center' }}>OK</Text>
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        )
    }
}

export default withRouter(ModalGameEnd);
