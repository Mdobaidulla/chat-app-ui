import React, {Component} from 'react';
import axios from 'axios';
import Person from './Person';


class ChatRoom extends Component{
    state={
        contacts:[],
        otherUserId: '',
        otherUserFirstName: '',
        otherUserLastName: '',
        otherUserEmail: '',
        chatroomId: '',
       }
   
    componentDidMount(){
        this.getOtherUser();  
    }

    getOtherUser= async () =>{
        try {
            const allUsers =await axios(
                process.env.REACT_APP_API_URL+`/chatrooms/getAllUsers/${this.props.chatroom._id}`
            );

            let chatroomId = this.props.chatroom._id;

            let otherUserId = '';
            allUsers.data.forEach(user => {
                if (user != this.props.current_user) {
                    otherUserId = user;
                }
            });

            const otherUserFirstName =await axios(
                process.env.REACT_APP_API_URL+`/users/first_name/${otherUserId}`
            );

            const otherUserLastName =await axios(
                process.env.REACT_APP_API_URL+`/users/last_name/${otherUserId}`
            );

            const otherUserEmail =await axios(
                process.env.REACT_APP_API_URL+`/users/email/${otherUserId}`
            );

            this.setState({
                otherUserId: otherUserId,
                otherUserFirstName: otherUserFirstName.data,
                otherUserLastName: otherUserLastName.data,
                otherUserEmail: otherUserEmail.data,
                chatroomId: chatroomId,
            });
        

        } 
        catch (err) {
            console.log(err);
        }
      
    }

    render(){
        if (this.props.chatroom._id != this.state.chatroomId) {
            this.getOtherUser();
        }

        return(
            <div>
                <Person first_name={this.state.otherUserFirstName} last_name={this.state.otherUserLastName}
                    chatroom_id={this.state.chatroomId} showConversation={this.props.showConversation}
                    getAllChatrooms={this.props.getAllChatrooms} email={this.state.otherUserEmail}
                    chatroomId={this.props.chatroom._id} highlight_chatroom={this.props.highlight_chatroom}
                    highlight_current_chatroom={this.props.highlight_current_chatroom}/>
            </div>
        ) 
    }
}
export default ChatRoom;