import React from "react";
import {withRouter} from "react-router-dom";
import {ChatWindow, ResultRow} from '../Components/AllComponents';
import {MySocket} from "../Misc/MySocket";

import "../Assets/Css/CustomStyle.css";
import {ResultsWrapper} from "../Components/ResultsWrapper";

class ModalGameEnd extends React.Component {

    componentDidMount() {
        MySocket.off("choose-your-number");
        MySocket.on("choose-your-number", () => {
            this.props.history.entries.length = 2;
            this.props.history.push("/enteryournumber");
        });
    }

    render() {

        const {results, isWinner, screen} = this.props.location.state;

        return (
            <div style={{flex: 1}}>
                <div
                    style={{flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>

                    <img src={require('../Assets/Images/logo.png')} alt="yalcin ozer"
                         style={{width: 150, height: 150}}/>

                    <p style={{textAlign: 'center', marginBottom: 2, marginTop: 2}}>
                        {isWinner ? 'Congratulations' : 'You lose'}
                    </p>

                    <div style={{flexDirection: 'row', alignItems: 'center'}}>
                        <span>The Secret number is </span>
                        <span className="SecretNumberStyle">
                            {screen === "gamescreen" ? MySocket.opponentNumber : 1234}
                        </span>
                    </div>

                    <div style={{flexDirection: "column", maxHeight: 140, overflowY: "auto"}}>
                        <ResultsWrapper results={results}/>
                    </div>

                    <div style={{flexDirection: 'row', marginTop: 8, marginBottom: 8}}>
                        {screen === "gamescreen" ?
                            <button
                                onClick={() => { MySocket.emit('send-invitation', MySocket.opponentID) }}
                                style={{minWidth: 60, justifyContent: 'center'}}>
                                <span style={{textAlign: 'center'}}>Invite to new game</span>
                            </button>
                            :
                            <button
                                onClick={() => { this.props.navigation.goBack(null) }}
                                style={{minWidth: 80, justifyContent: 'center'}}>
                                <span style={{textAlign: 'center'}}>OK</span>
                            </button>}
                    </div>
                    <div style={{flex: 1, flexDirection: "column", width: "100%"}}>
                        <ChatWindow style={{flex: 1, flexDirection: "column"}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ModalGameEnd);
