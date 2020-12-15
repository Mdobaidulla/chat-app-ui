import React, {Component} from 'react';
import axios from 'axios'
import ProfileDefaultImage from '../images/defaultImage.png'
import { Icon } from 'semantic-ui-react';
class Person extends Component{
    state={
        chatroomId: '',
       }
//We are retriving chatroom id here and based on the we are going the display all the chat from the chat room. 
    componentDidMount(){
        this.setState({
            chatroomId: this.props.chatroom_id
        });
    }

    deleteChatroom = async () => {
        console.log("Delete Chatroom: " + this.props.chatroom_id);

        const chat = await axios({
            method: 'delete',
            url: `http://localhost:5000/chatrooms/${this.props.chatroom_id}`
        });

        this.props.getAllChatrooms();
    }

    render(){
        console.log("this.props.highlight_chatroom: ", this.props.highlight_chatroom);
        console.log("this.props.chatroom_id: ", this.props.chatroom_id);

        let highlight_message = "";
        let classString = "char_room_list";
        if ((this.props.highlight_chatroom == this.props.chatroom_id) && 
        (this.props.highlight_current_chatroom != this.props.chatroom_id)) {
            highlight_message = "pending";
            classString = "char_room_list highlight";
        }
        else if ((this.props.highlight_chatroom != this.props.chatroom_id) && 
        (this.props.highlight_current_chatroom == this.props.chatroom_id)) {
            highlight_message = "current";
            classString = "char_room_list highlight_current";
        }
        else if ((this.props.highlight_chatroom == this.props.chatroom_id) && 
        (this.props.highlight_current_chatroom == this.props.chatroom_id)) {
            highlight_message = "current";
            classString = "char_room_list highlight_current";
        }
        else {
            highlight_message = "";
            classString = "char_room_list";
        }

        return(
            <div className="left aligned column" onClick={() => this.props.showConversation(this.props.chatroom_id)}>
                <div className="ui vertical fluid menu contcat">
                        <div className={classString}>
                        <i onClick={this.deleteChatroom}> <Icon name='trash alternate outline' size='small' /></i>
                        <img src={ProfileDefaultImage} height="40" width="40" className="images" />
                        {this.props.first_name} {this.props.last_name }
                        <br></br>
                        {this.props.email} {highlight_message}
                        </div>
                </div>
            </div>
        )
    }
    clickingOnChatRoom(chatroomId){
        console.log('my chatroom is working');
        console.log('my chatroom is ' + chatroomId);
    }
}

export default Person;