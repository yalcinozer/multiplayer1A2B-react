import React from "react";
import {withRouter} from "react-router-dom";
import {Text,brown,yellow} from "../Assets/Components";
import "../Assets/CustomStyle.css";

const h1={
    fontSize: 24,
    marginVertical: 8
}

class HowToPlay extends React.Component {

    render() {
        return (
            <div style={{ flexDirection:"column" }}>
                <div style={{display:"block",height:"8%"}}>
                    <span onClick={()=>{this.props.history.goBack();}}>Back</span>
                </div>
                <div style={{ display:"block",height:"92%",overflowY:"auto" }}>
                    <Text style={h1}>What is 1<span style={{ color: yellow }}>A</span>2<span style={{ color: brown }}>B</span>?</Text>
                    <Text>A logic game where the player tries to find the secret number of the opponent.</Text>
                    <Text style={h1}>Rules</Text>
                    <Text>- Both players choose a number for themselves. The digits must be all different.</Text>
                    <Text>- Players make guess in turn. After every guess, result is added to list.</Text>
                    <Text>-<span style={{ color: yellow }}>A</span> refers to right number and right position, and <span style={{ color: brown }}>B</span> refers to right number but wrong position.</Text>
                    <Text style={h1}>How to analyse the results?</Text>
                    <Text>Let's think that secret number is</Text>
                    <Text style={{textAlign:"center"}}>
                        <span className="SecretNumberStyle">1234</span>
                    </Text>
                    <Text >And presume that our first guess is <span style={{ color: '#c23b22' }}>5632</span> and second guess is <span style={{ color: '#c23b22' }}>5637</span>. Results will be displayed as below;</Text>
                    <Text style={{ textAlign: 'center', fontSize: 22,  marginVertical: 5,margin:0 }}>5632 1<span style={{ color: yellow }}>A</span> 1<span style={{ color: brown }}>B</span></Text>
                    <Text style={{ textAlign: 'center', fontSize: 22,  marginVertical: 5,margin:0 }}>5637 1<span style={{ color: yellow }}>A</span> 0<span style={{ color: brown }}>B</span></Text>
                    <Text style={{ textDecorationLine: 'underline' }}>If we analyse the results from two guesses:</Text>
                    <Text>- We only changed "2" to "7" in our second guess.</Text>
                    <Text>- "A" count remained same and "B" count dropped to zero.</Text>
                    <Text style={{ color: '#c23b22' }}>So we can infer that there is "2" in secret number but it is not last digit. Now we also know that 5,6 or 3 is in right position. Finally we learned that "7" is not in secret number.</Text>
                    <Text>You will grasp the logic better when you play it a few times.</Text>
                    <Text>An experienced player can find out the secret number in 6-7 guesses.</Text>
                </div>
            </div>
        )
    }
}

export default withRouter(HowToPlay);
