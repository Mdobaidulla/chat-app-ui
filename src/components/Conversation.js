import React, {Component, useEffect, useRef} from 'react';
import axios from 'axios';
import Message from './Message';
import socketIOClient from "socket.io-client";


class Conversation extends Component{
    state={
        chats: [],
        chatroom: '',
        received_msg: '',
        socket: null,
       }

    componentDidMount(){
        this.getConversation();
        this.scrollToBottom();
    }

    componentDidUnMount(){
        if (this.state.socket != null) {
            this.state.socket.disconnect();
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
      }

//This method will update the 
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    getConversation= async () =>{
        try {
        const allConversations = await axios(
            process.env.REACT_APP_API_URL+`/chats/chatroom/${this.props.chatroom}`
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
        console.log("conversation: this.props.chatroom is " + this.props.chatroom);
        console.log("conversation: this.state.chatroom is " + this.state.chatroom);

 //       if (this.props.chatroom != null) {
            if (this.state.chatroom != this.props.chatroom) {
                this.getConversation();

                const socket = socketIOClient(process.env.REACT_APP_API_URL);
                socket.on('text_message', (text_msg) => {
                    console.log("conversation text message: ", text_msg);

                    let j = 0;
                    let chatroomString = '';
                    while(text_msg.charAt(j) != '|') {
                        chatroomString = chatroomString + text_msg.charAt(j);
                        j++;
                    }
                    console.log("chatroomString is " + chatroomString);

                    if (chatroomString == this.props.chatroom) {
                        if (this.state.received_msg != text_msg) {
                            this.getConversation();
    
                            this.setState({
                                received_msg: text_msg,
                            })
                        }
                    }
                    else {
                        this.props.handleHighlightChatroom(chatroomString);
                    }
                });

                this.setState({
                    chatroom: this.props.chatroom,
                    socket: socket,
                });
            }
 //       }

        const allMessages = this.state.chats.map((chat, index)=>{
            return(
                <Message key={index} user={chat.user}
                user={chat.user}
                 message={chat.message} timestamp={chat.createdAt} 
                id={chat._id} getConversation={this.getConversation}
                currentUser={this.props.currentUser}
                />
            )
        })

        return(
        <>
         <div >    
		    <h3 >{ allMessages}</h3 >
         </div>
          <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </>
        )
    }
}
export default Conversation;