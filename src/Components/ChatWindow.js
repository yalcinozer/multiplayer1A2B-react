import React from 'react';
import '../Assets/Css/CustomStyle.css';

import { View, TouchableOpacity, ChatMessage } from './AllComponents';

class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    mesajGonder = () => {
        this.props.socket.emit('send-message', [this.props.socket.id, this.state.text]);
        this.setState({ text: "" })
    };

    _handleChange = (e) => {
        this.setState({ text: e.target.value });
    };

    render() {

        const messagesComps = this.props.messages.map((value) => {
            return (
                <ChatMessage from={value[0]} message={value[1]} socket={this.props.socket} />
            )
        });

        return (
            <View style={this.props.style}>
                <div ref={(ref) => { this.scrollable = ref }}
                    style={{
                        flex: 3,
                        flexDirection: "column",
                        backgroundColor: '#cad9f2',
                        overflowY: "auto",
                        maxHeight: 160
                    }}>
                    <p style={{ textAlign: 'center', margin: 4 }}>Have a chat with your
                        opponent</p>
                    {messagesComps}
                </div>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#abc2e7',
                    paddingHorizontal: 10
                }}>
                    <input style={{ flex: 6, paddingBottom: 0, paddingTop: 0, textAlign: "left" }}
                        className="TextInput"
                        placeholder="Say something"
                        type="text"
                        value={this.state.text}
                        onChange={this._handleChange} />
                    <TouchableOpacity
                        style={{ flex: 2 }}
                        onPress={this.mesajGonder}
                    >
                        <span style={{ fontSize: "1rem" }}>Send</span>
                    </TouchableOpacity>
                </View>
                {this.scrollable ? this.scrollable.scrollBy(0, 80) : null}
            </View>
        )
    }
}
export default ChatWindow;