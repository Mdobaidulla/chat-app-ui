import React, {Component} from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';

class DropdownNewChat extends Component{
    state={
        users:[],
        selection: 'Emails of Users',
    }

    componentDidMount(){
        this.getAllUserEmails();
    }

    getAllUserEmails= async () =>{
        try {
        const allUsers =await axios(
            process.env.REACT_APP_API_URL+`/users/`
        );
        console.log('All User Emails', allUsers.data);

        let emailList = [];
        allUsers.data.forEach(user => {
            if (user._id != this.props.current_user) {
                emailList.push(user.email);
            }
        });

        this.setState({
            users: emailList,
        });

        } catch (err) {
            console.log(err);
        }
    }

    handleDropDownSelect = async (event) => {
        console.log("handleDropDownSelect");
        console.log("event.target", event.target);
        console.log("event.target.textContent", event.target.textContent);

        let otherUser = await axios(process.env.REACT_APP_API_URL+`/users/userIdByEmail/${event.target.textContent}`);

        console.log("otherUser.data: ", otherUser.data);

        await axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/chatrooms',
            data: {
                users: [this.props.current_user, otherUser.data],
                isActive: true,
            }
        });

        const allChatrooms = await axios(
            process.env.REACT_APP_API_URL+`/chatrooms/chatroomWithUserId/${this.props.current_user}`
        );
        console.log('All Chatroom Values', allChatrooms.data);

        this.setState({
            chatrooms: allChatrooms.data,
            textAreaValue: '',
            selection: 'Emails of Users',
        });

        this.props.showChatrooms(allChatrooms.data);
    }

    render() {
        const emailList = this.state.users.map( (user, index) => ({
            key: user,
            text: user,
            value: user,
        }))

        return(
         <>    
            <Dropdown placeholder='Search Users' search selection options={emailList} 
            onChange={this.handleDropDownSelect} value={this.state.selection}/>
         </>
        )
    }
}
export default DropdownNewChat;