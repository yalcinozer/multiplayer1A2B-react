import React from "react";
import {withRouter} from "react-router-dom";
import {
    Text,
    brown,
    yellow,
    View,
    GiantLetter,
    TouchableOpacity,
    TopBar
} from "../Assets/Components";
import "../Assets/CustomStyle.css";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.socket=this.props.socket;
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
        this.setState({playerName: event.target.value});
    }

    handleQuestionMark=()=>{
        this.props.history.push("/howtoplay");
    }

    render() {

        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <View style={{flex:0}}>
                    <span style={{fontSize:"2rem",marginLeft:8}} onClick={this.handleQuestionMark}>?</span>
                </View>
                <View style={{flex: 10, flexDirection: "column", justifyContent: "center"}}>
                    <Text style={{marginBottom: -62, textAlign: "center"}}> <GiantLetter content="1"/><GiantLetter
                        style={{color: yellow}} content="A"/></Text>
                    <Text style={{marginBottom: -30, textAlign: "center"}}><GiantLetter content="2"/><GiantLetter
                        style={{color: brown}} content="B"/></Text>
                    <Text style={{margin: 0, textAlign: "center", fontSize: "2rem"}}>Multiplayer</Text>
                </View>
                <View style={{flex: 5, flexDirection: "column", alignItems: "center"}}>
                    <p style={{margin: 0, textAlign: "center"}}>Player Name</p>
                    <input
                        type="text"
                        className="TextInput"
                        style={{maxWidth: "50%"}}
                        value={this.state.playerName}
                        maxLength="10"
                        onChange={this.handleChange}/>
                    <TouchableOpacity style={{margin: 5}} onPress={this.doneButtonFunction}>
                        <span style={{fontSize:"1rem"}} >Done</span>
                    </TouchableOpacity>
                </View>
            </View>
        )
            ;
    }
}

export default withRouter(Home);
