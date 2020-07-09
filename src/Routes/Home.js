import React from "react";
import {withRouter} from "react-router-dom";
import {brown, yellow} from '../Misc/Colors';
import "../Assets/Css/CustomStyle.css";
import {MySocket} from "../Misc/MySocket";

class Home extends React.Component {

    state = {
        playerName: localStorage.getItem("playername") || "player"
    }

    componentDidMount() {
        MySocket.on('name-approved', () => {
            this.props.history.push("/playerlist");
        });
        document.onkeypress = (event) => {
            console.log(event.key);
            if (event.key === "Enter") {
                this.doneButtonFunction();
            }
        }
    }

    componentWillUnmount() {
        document.onkeypress = null;
    }

    doneButtonFunction = () => {

        if (MySocket.disconnected) {
            MySocket.connect();
        }
        if (this.state.playerName.toLowerCase() === "you") {
            alert('What is your purpose :-)');
            return;
        }
        MySocket.emit("send-player-name", this.state.playerName);
        localStorage.setItem("playername", this.state.playerName);
    }


    handleChangeText = (event) => {
        this.setState({playerName: event.target.value});
    }

    handleQuestionMark = () => {
        this.props.history.push("/howtoplay");
    }

    render() {

        return (
            <div style={{flex: 1, flexDirection: "column"}}>
                <div style={{flex: 0}}>
                    <span style={{fontSize: "2rem", marginLeft: 8}}
                          onClick={this.handleQuestionMark}>
                        ?
                    </span>
                </div>
                <div style={{flex: 10, flexDirection: "column", justifyContent: "center"}}>

                    <p style={{marginBottom: -62, textAlign: "center"}}>
                        <span className="GiantLetter">1</span>
                        <span className="GiantLetter" style={{color: yellow}}>B</span>
                    </p>
                    <p style={{marginBottom: -30, textAlign: "center"}}>
                        <span className="GiantLetter">2</span>
                        <span className="GiantLetter" style={{color: brown}}>B</span>
                    </p>

                    <p style={{margin: 0, textAlign: "center", fontSize: "2rem"}}>Multiplayer</p>

                </div>
                <div style={{flex: 5, flexDirection: "column", alignItems: "center"}}>
                    <p style={{margin: 0, textAlign: "center"}}>Player Name</p>
                    <input
                        type="text"
                        className="TextInput"
                        style={{maxWidth: "50%"}}
                        value={this.state.playerName}
                        maxLength="10"
                        onChange={this.handleChangeText}/>
                    <button style={{margin: 5}} onClick={this.doneButtonFunction}>
                        Done
                    </button>
                </div>
            </div>
        )
            ;
    }
}

export default withRouter(Home);
