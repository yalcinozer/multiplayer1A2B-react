import React from "react";
import { withRouter } from "react-router-dom";

import { Text, View, TouchableOpacity} from '../Components/AllComponents';
import { brown, yellow } from '../Misc/Colors';
import "../Assets/Css/CustomStyle.css";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.socket = this.props.socket;
    }

    state = {
        playerName: localStorage.getItem("playername") || "player"
    }

    componentDidMount() {
        
        this.socket.off('name-approved');
        this.socket.on('name-approved', () => {
            this.props.history.push("/playerlist");
        });
    }

    doneButtonFunction = () => {

        if (this.socket.disconnected) {
            this.socket.connect();
        }
        if (this.state.playerName.toLowerCase() === "you") {
            alert('What is your purpose :-)');
            return;
        }
        this.socket.emit("send-player-name", this.state.playerName);
        localStorage.setItem("playername", this.state.playerName);
    }


    handleChange = (event) => {
        this.setState({ playerName: event.target.value });
    }

    handleQuestionMark = () => {
        this.props.history.push("/howtoplay");
    }

    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 0 }}>
                    <span style={{ fontSize: "2rem", marginLeft: 8 }} onClick={this.handleQuestionMark}>?</span>
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: "center" }}>
                    <Text style={{ marginBottom: -62, textAlign: "center" }}>
                        <span className="GiantLetter">1</span>
                        <span className="GiantLetter" style={{ color: yellow }}>B</span>
                    </Text>
                    <Text style={{ marginBottom: -30, textAlign: "center" }}>
                        <span className="GiantLetter">2</span>
                        <span className="GiantLetter" style={{ color: brown }}>B</span></Text>
                    <Text style={{ margin: 0, textAlign: "center", fontSize: "2rem" }}>Multiplayer</Text>
                </View>
                <View style={{ flex: 5, flexDirection: "column", alignItems: "center" }}>
                    <p style={{ margin: 0, textAlign: "center" }}>Player Name</p>
                    <input
                        type="text"
                        className="TextInput"
                        style={{ maxWidth: "50%" }}
                        value={this.state.playerName}
                        maxLength="10"
                        onChange={this.handleChange} />
                    <TouchableOpacity style={{ margin: 5 }} onPress={this.doneButtonFunction}>
                        <span style={{ fontSize: "1rem" }}>Done</span>
                    </TouchableOpacity>
                </View>
            </View>
        )
            ;
    }
}

export default withRouter(Home);
