import React, {Component} from 'react';
import axios from 'axios';

class ChatroomControl extends Component{
    state={
        textAreaValue: '',
       }

    handleChange = (event) => {
        this.setState({ 
            textAreaValue: event.target.value,
        });

        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            this.handleSendClick();
        }
    }

    handleSendClick = async (event) => {
        console.log("Send Button clicked");

        let otherUser = await axios(`http://localhost:5000/users/userIdByEmail/${this.state.textAreaValue}`);

        await axios({
            method: 'post',
            url: `http://localhost:5000/chatrooms`,
            data: {
                users: [this.props.current_user, otherUser.data],
                isActive: true,
            }
        });

        const allChatrooms = await axios(
            `http://localhost:5000/chatrooms/chatroomWithUserId/${this.props.current_user}`
        );
        console.log('All Chatroom Values', allChatrooms.data);

        this.setState({
            chatrooms: allChatrooms.data,
            textAreaValue: '',
        });

        this.props.showChatrooms(allChatrooms.data);
    }

    handleClearClick = (event) => {
        console.log("Cancel Button clicked");

        this.setState({ 
            textAreaValue: '',
        });
    }

    handleUserKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
          // e.preventDefault();
          this.handleSendClick();
        }

    };

    render(){

        return(
            <>    
            <form onSubmit={this.handleSendClick}>
                <textarea 
                    type="textarea" 
                    name="input_name"
                    value={this.state.textAreaValue}
                    onChange={this.handleChange}
                    onKeyPress={this.handleUserKeyPress}
                    rows={1}
                    cols={30}
                />
            </form>
            <button onClick={this.handleSendClick}>Send</button>
            <button onClick={this.handleClearClick}>Clear</button>
         </>
        )
    }
}

export default ChatroomControl;