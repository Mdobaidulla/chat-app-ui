import React, {Component} from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';

class ChatRooms extends Component{
    state={
        contacts:[],
        chatrooms: [],
        length: 0,
       }
   
    componentDidMount(){
        this.getAllChatrooms();
    }

    getAllChatrooms= async () =>{
        try {
        const allChatrooms =await axios(
            `http://localhost:5000/chatrooms/chatroomWithUserId/${this.props.current_user}`
        );
        console.log('All Chatroom Values', allChatrooms.data);

        this.setState({
            chatrooms: allChatrooms.data,
        });

        this.props.showChatrooms(allChatrooms.data);

        } catch (err) {
            console.log(err);
        }
    }

    render(){
        console.log("this.props.chatrooms.length is " + this.props.chatrooms.length);

        if (this.state.length != this.props.chatrooms.length) {
            this.getAllChatrooms();

            this.setState({
                length: this.props.chatrooms.length,
            });
        }

        const allChatrooms = this.props.chatrooms.map((chatroom, index) => {
            console.log("chatroom is " + chatroom._id);
            return(
                <ChatRoom key={index} chatroom={chatroom} current_user={this.props.current_user}
                showConversation={this.props.showConversation} getAllChatrooms={this.getAllChatrooms}/>
            )
        })
        return(
         <>    
		    {allChatrooms}
         </>
        )
    }
}

export default ChatRooms;