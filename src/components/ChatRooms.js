import React, {Component} from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';

class ChatRooms extends Component{
    state={
        contacts:[],
        chatrooms: [],
        length: 0,
        highlight_chatroom: '',
        received_msg: '',
       }
   
    componentDidMount(){
        this.getAllChatrooms();
    }

    getAllChatrooms= async () =>{
        try {
        const allChatrooms =await axios(
            process.env.REACT_APP_API_URL+`/chatrooms/chatroomWithUserId/${this.props.current_user}`
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
        console.log("chatrooms: this.props.highlight_chatroom: ", this.props.highlight_chatroom);

        if (this.state.length != this.props.chatrooms.length) {
            this.getAllChatrooms();

            this.setState({
                length: this.props.chatrooms.length,
            });
        }

        if (this.state.highlight_chatroom != this.props.highlight_chatroom) {
            this.getAllChatrooms();

            this.setState({
                highlight_chatroom: this.props.highlight_chatroom,
            });
        }

        const allChatrooms = this.props.chatrooms.map((chatroom, index) => {
            console.log("chatroom is " + chatroom._id);
            return(
                <ChatRoom key={index} chatroom={chatroom} current_user={this.props.current_user}
                showConversation={this.props.showConversation} getAllChatrooms={this.getAllChatrooms}
                highlight_chatroom={this.props.highlight_chatroom} 
                highlight_current_chatroom={this.props.highlight_current_chatroom}/>
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