import React from 'react';
import {Switch, Route, MemoryRouter} from "react-router-dom";

//Routes
import HowToPlay from "./Routes/HowToPlay";
import Home from "./Routes/Home";
import PlayerList from "./Routes/PlayerList";
import EnterYourNumber from "./Routes/EnterYourNumber";
import GameScreen from "./Routes/GameScreen";
import ModalGameEnd from "./Routes/ModalGameEnd";

export default function App() {
    return (
        <MemoryRouter>
            <Switch>
                <Route path="/playerlist">
                    <PlayerList/>
                </Route>
                <Route path="/enteryournumber">
                    <EnterYourNumber/>
                </Route>
                <Route path="/gamescreen">
                    <GameScreen/>
                </Route>
                <Route path="/modalgameend">
                    <ModalGameEnd/>
                </Route>
                <Route path="/howtoplay">
                    <HowToPlay/>
                </Route>
                <Route exact={true} path="/">
                    <Home/>
                </Route>
            </Switch>
        </MemoryRouter>
    );
}


