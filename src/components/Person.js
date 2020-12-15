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
        return(
            <div className="left aligned column" onClick={() => this.props.showConversation(this.props.chatroom_id)}>
                <div className="ui vertical fluid menu contcat">
                        <div className="char_room_list">
                        <img src={ProfileDefaultImage} height="40" width="40" className="images" />
                        {this.props.first_name} {this.props.last_name } {this.props.chatroom_id}
                        <i onClick={this.deleteChatroom}> <Icon name='trash alternate outline' size='small' /></i>
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