import React, {Component} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";

class ChatBox extends Component{
    state={
        textAreaValue: '',
    }
   
    // componentDidMount(){
    //     this.getAllChatrooms();
    // }

    // getAllChatrooms= async () =>{
    //     try {
    //     const allChatrooms =await axios(
    //         `http://localhost:5000/chatrooms/chatroomWithUserId/${this.props.current_user}`
    //     );
    //     console.log('All Chatroom Values', allChatrooms.data);
    //     this.setState({
    //         chatrooms: allChatrooms.data
    //     });
    //     } 
    //     catch (err) {
    //         console.log(err);
    //     }
      
    //     }

    send = () => {
        console.log("Sending socket.io emit");
        const socket = socketIOClient('http://localhost:5000');
        socket.emit('text_message', this.state.textAreaValue) // send out text message
    }

    handleChange = (event) => {
        this.setState({ 
            textAreaValue: event.target.value,
        });
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

    render(){
        const socket = socketIOClient('http://localhost:5000');
        socket.on('text_message', (text_msg) => {
            console.log("text message", text_msg);
        });
        
        return(
         <>    
		    <div>
                <textarea 
                    type="textarea" 
                    name="input_chat"
                    value={this.state.textAreaValue}
                    onChange={this.handleChange}
                    rows={5}
                    cols={50}
                />
            </div>
            <button onClick={this.handleSendClick}>Send</button>
            <button onClick={this.handleClearClick}>Clear</button>
         </>
        )
    }
}

export default ChatBox;