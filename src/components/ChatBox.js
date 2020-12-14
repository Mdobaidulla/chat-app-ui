import React, {Component} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { Icon } from 'semantic-ui-react';


class ChatBox extends Component{
    state={
        textAreaValue: '',
        socket: null,
    }
   

    componentDidUnMount(){
        if (this.state.socket != null) {
            this.state.socket.disconnect();
        }
    }

    send = () => {
        console.log("Sending socket.io emit");

        let sendMessage = this.props.chatroom + "|" + this.state.textAreaValue

        const socket = socketIOClient('http://localhost:5000');
        socket.emit('text_message', sendMessage) // send out text message

        this.setState({
            chatroom: this.props.chatroom,
            socket: socket,
        });
    }

    handleChange = (event) => {
        this.setState({ 
            textAreaValue: event.target.value,
        });

        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            this.handleSendClick();
          }
    }

    handleSendClick = async (event) => {
        console.log("Send Button clicked");
        this.send();

        await axios({
            method: 'post',
            url: 'http://localhost:5000/chats',
            data: {
                chatroom: this.props.chatroom,
                user: this.props.current_user,
                message: this.state.textAreaValue
            }
        });

        this.setState({ 
            textAreaValue: '',
        });
    }

    handleClearClick = (event) => {
        console.log("Cancel Button clicked");

        this.setState({ 
            textAreaValue: '',
        });
    }

    handleUserKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
          // e.preventDefault();
          this.handleSendClick();
        }
    };

    render(){
        // const socket = socketIOClient('http://localhost:5000');
        // socket.on('text_message', (text_msg) => {
        //     console.log("text message", text_msg);
        // });
        
        return(
         <>    
		    <div className="text-areas">
                <textarea 
                    type="textarea" 
                    name="input_chat"
                    value={this.state.textAreaValue}
                    onChange={this.handleChange}
                    rows={3}
                    onKeyPress={this.handleUserKeyPress}   
                />
            </div>
            <div className="buttons">
            <button onClick={this.handleSendClick}>
            <Icon inverted  name='arrow right' size='big' />
                </button>
            {/* <button onClick={this.handleClearClick}>Clear</button> */}
            </div>
         </>
        )
    }
}

export default ChatBox;