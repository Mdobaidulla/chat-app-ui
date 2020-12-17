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

        const socket = socketIOClient(process.env.REACT_APP_API_URL);
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
            url: process.env.REACT_APP_API_URL+`/chats`,
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
          this.handleSendClick();
        }
    };

    render(){
        
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
            </div>
         </>
        )
    }
}

export default ChatBox;