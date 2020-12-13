import React, {Component} from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';

class ChatRooms extends Component{
    state={
        contacts:[],
        chatrooms: []
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
        await this.setState({
            chatrooms: allChatrooms.data
        });

    } catch (err) {
        console.log(err);
      }
      
    }

    render(){
        const allChatrooms = this.state.chatrooms.map((chatroom, index)=>{
            console.log("chatroom is " + chatroom.chatroom_id);
            return(
                <ChatRoom key={index} chatroom={chatroom} current_user={this.props.current_user}
                showConversation={this.props.showConversation}/>
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