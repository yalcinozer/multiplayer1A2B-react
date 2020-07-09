import React from "react";
import {withRouter} from "react-router-dom";
import {yellow, brown} from '../Misc/Colors';

import "../Assets/Css/CustomStyle.css";

const h1 = {
    fontSize      : 24,
    marginVertical: 8
}

class HowToPlay extends React.Component {

    render() {
        return (
            <div style={{flexDirection: "column"}}>
                <div style={{display: "block", height: "8%"}}>
                    <span onClick={() => {this.props.history.goBack();}}>Back</span>
                </div>
                <div style={{display: "block", height: "92%", overflowY: "auto"}}>
                    <p style={h1}>What is 1<span style={{color: yellow}}>A</span>2<span
                        style={{color: brown}}>B</span>?</p>
                    <p>A logic game where the player tries to find the secret number of the opponent.</p>
                    <p style={h1}>Rules</p>
                    <p>- Both players choose a number for themselves. The digits must be all different.</p>
                    <p>- Players make guess in turn. After every guess, result is added to list.</p>
                    <p>-<span style={{color: yellow}}>A</span> refers to right number and right position,
                        and <span style={{color: brown}}>B</span> refers to right number but wrong position.
                    </p>
                    <p style={h1}>How to analyse the results?</p>
                    <p>Let's think that secret number is</p>
                    <p style={{textAlign: "center"}}>
                        <span className="SecretNumberStyle">1234</span>
                    </p>
                    <p>And presume that our first guess is <span style={{color: '#c23b22'}}>5632</span> and
                        second guess is <span style={{color: '#c23b22'}}>5637</span>. Results will be
                        displayed as below;</p>
                    <p style={{textAlign: 'center', fontSize: 22, marginVertical: 5, margin: 0}}>5632 1<span
                        style={{color: yellow}}>A</span> 1<span style={{color: brown}}>B</span></p>
                    <p style={{textAlign: 'center', fontSize: 22, marginVertical: 5, margin: 0}}>5637 1<span
                        style={{color: yellow}}>A</span> 0<span style={{color: brown}}>B</span></p>
                    <p style={{textDecorationLine: 'underline'}}>If we analyse the results from two
                        guesses:</p>
                    <p>- We only changed "2" to "7" in our second guess.</p>
                    <p>- "A" count remained same and "B" count dropped to zero.</p>
                    <p style={{color: '#c23b22'}}>So we can infer that there is "2" in secret number but it is
                        not last digit. Now we also know that 5,6 or 3 is in right position. Finally we
                        learned that "7" is not in secret number.</p>
                    <p>You will grasp the logic better when you play it a few times.</p>
                    <p>An experienced player can find out the secret number in 6-7 guesses.</p>
                </div>
            </div>
        )
    }
}

export default withRouter(HowToPlay);
