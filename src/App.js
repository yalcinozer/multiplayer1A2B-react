import React from 'react';
import {Switch, Route, MemoryRouter} from "react-router-dom";
import socket from "./Misc/MySocket";

//Routes
import HowToPlay from "./Routes/HowToPlay";
import PlayerList from "./Routes/PlayerList";
import Home from "./Routes/Home";
import EnterYourNumber from "./Routes/EnterYourNumber";
import GameScreen from "./Routes/GameScreen";
import ModalGameEnd from "./Routes/ModalGameEnd";

export default function App() {
    return (
        <MemoryRouter>
            <Switch>
                <Route path="/playerlist">
                    <PlayerList socket={socket}/>
                </Route>
                <Route path="/enteryournumber">
                    <EnterYourNumber socket={socket}/>
                </Route>
                <Route path="/gamescreen">
                    <GameScreen socket={socket}/>
                </Route>
                <Route path="/modalgameend">
                    <ModalGameEnd socket={socket}/>
                </Route>
                <Route path="/howtoplay">
                    <HowToPlay/>
                </Route>
                <Route exact={true} path="/">
                    <Home socket={socket}/>
                </Route>
            </Switch>
        </MemoryRouter>
    );
}


