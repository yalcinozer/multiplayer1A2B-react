import React from 'react';
import {ChatMessage} from './AllComponents';
import {MySocket} from "../Misc/MySocket";
import '../Assets/Css/CustomStyle.css';

class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text    : "",
            messages: []
        }
    }

    componentDidMount() {
        MySocket.on('receive-message', this.mesajAl);
        document.onkeypress = ("keypress", (event) => {
            if (event.key === "Enter") {
                this.mesajGonder();
            }
        })
    }

    componentWillUnmount() {
        MySocket.off("receive-message");
        document.onkeypress = null;
    }

    mesajGonder = () => {

        MySocket.emit('send-message', [MySocket.id, this.state.text]);
        this.setState({text: ""});

    };

    mesajAl = (data) => {
        const temp = [...this.state.messages];
        temp.push([data[0], data[1]]);
        this.setState({messages: temp})
    }

    _handleChange = (e) => {
        this.setState({text: e.target.value});
    };

    render() {

        const messagesComps = this.state.messages.map((item, index) => {
            return (
                <ChatMessage key={index} from={item[0]} message={item[1]}/>
            )
        });

        return (
            <div style={this.props.style}>
                <div ref={(ref) => { this.scrollview = ref }}
                     style={{
                         flex           : 3,
                         flexDirection  : "column",
                         backgroundColor: '#cad9f2',
                         overflowY      : "auto",
                         maxHeight      : 160
                     }}>
                    <p style={{textAlign: 'center', margin: 4}}>Have a chat with your
                        opponent</p>
                    {messagesComps}
                </div>
                <div style={{
                    flex             : 1,
                    flexDirection    : 'row',
                    justifyContent   : 'center',
                    alignItems       : 'center',
                    backgroundColor  : '#abc2e7',
                    paddingHorizontal: 10
                }}>
                    <input style={{flex: 6, paddingBottom: 0, paddingTop: 0, textAlign: "left"}}
                           className="TextInput"
                           placeholder="Say something"
                           type="text"
                           value={this.state.text}
                           onChange={this._handleChange}/>
                    <button
                        style={{flex: 2}}
                        onClick={this.mesajGonder}
                    >
                        Send
                    </button>
                </div>
                {this.scrollview && this.scrollview.scrollBy(0, 80)}
            </div>
        )
    }
}

export default ChatWindow;
