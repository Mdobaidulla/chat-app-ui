import React, {Component} from 'react';
import axios from 'axios';
import Message from './Message';

class Conversation extends Component{
    state={
        chats: [],
        chatroom: '',
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

        if (this.state.chats[0] != null) {
            console.log("chats length: " + this.state.chats.length);
            console.log("first message: " + this.state.chats[0].message);
        }

        const allMessages = this.state.chats.map((chat, index)=>{
            return(
                <Message key={index} user={chat.user} message={chat.message}/>
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