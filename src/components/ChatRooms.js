import React, {Component} from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';
import socketIOClient from "socket.io-client";

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
        console.log("chatrooms: this.props.highlight_chatroom: ", this.props.highlight_chatroom);

        // const socket = socketIOClient('http://localhost:5000');
        //         socket.on('delete_chatroom', (text_msg) => {
        //             console.log("chatrooms delete_chatroom: ", text_msg);
                        
        //             if (this.state.received_msg != text_msg) {
        //                 this.getAllChatrooms();
    
        //                 this.setState({
        //                     received_msg: text_msg,
        //                 })
        //             }
        //         });

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