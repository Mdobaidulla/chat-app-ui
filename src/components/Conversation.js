import React, {Component} from 'react';
import axios from 'axios';
import Message from './Message';
import socketIOClient from "socket.io-client";

class Conversation extends Component{
    state={
        chats: [],
        chatroom: '',
        received_msg: '',
       }
   
    componentDidMount(){
        this.getConversation();
        
    }
    getConversation= async () =>{
        try {
        const allConversations = await axios(
            `http://localhost:5000/chats/chatroom/${this.props.chatroom}`
        );
        console.log('Conversation - All Chatroom Values', allConversations.data);

        this.setState({
            chats: allConversations.data,
        });

    } catch (err) {
        console.log(err);
      }
      
    }

    render(){
        console.log("conversation: chatroom is " + this.props.chatroom);

        if (this.props.chatroom != null) {
            if (this.state.chatroom != this.props.chatroom) {
                this.getConversation();

                this.setState({
                    chatroom: this.props.chatroom,
                });
            }
            
        }

        const socket = socketIOClient('http://localhost:5000');
        socket.on('text_message', (text_msg) => {
            console.log("text message", text_msg);
            if (this.state.received_msg != text_msg) {
                this.getConversation();

                this.setState({
                    received_msg: text_msg,
                })
            }
        });

        const allMessages = this.state.chats.map((chat, index)=>{
            return(
                <Message key={index} user={chat.user} message={chat.message} timestamp={chat.createdAt}/>
            )
        })

        return(
         <>    
		    <h3>{allMessages}</h3>
         </>
        )
    }
}

export default Conversation;