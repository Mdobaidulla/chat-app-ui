import React, {Component} from 'react'
import axios from 'axios'
import Person from './Person'

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
                `http://localhost:5000/chatrooms/getAllUsers/${this.props.chatroom._id}`
            );
            // console.log('All User Values', allUsers.data);

            let chatroomId = this.props.chatroom._id;
            // console.log('my chatroom is ' + chatroomId);

            let otherUserId = '';
            allUsers.data.forEach(user => {
                if (user != this.props.current_user) {
                    otherUserId = user;
                }
            });
            // console.log('otherUserId: ', otherUserId);

            const otherUserFirstName =await axios(
                `http://localhost:5000/users/first_name/${otherUserId}`
            );

            // console.log("otheruserfirstname " + otherUserFirstName.data);

            const otherUserLastName =await axios(
                `http://localhost:5000/users/last_name/${otherUserId}`
            );

            const otherUserEmail =await axios(
                `http://localhost:5000/users/email/${otherUserId}`
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
            <>
                <Person first_name={this.state.otherUserFirstName} last_name={this.state.otherUserLastName}
                    chatroom_id={this.state.chatroomId} showConversation={this.props.showConversation}
                    getAllChatrooms={this.props.getAllChatrooms} email={this.state.otherUserEmail}
                    chatroomId={this.props.chatroom._id} highlight_chatroom={this.props.highlight_chatroom}
                />
            </>
        ) 
    }
}
export default ChatRoom;