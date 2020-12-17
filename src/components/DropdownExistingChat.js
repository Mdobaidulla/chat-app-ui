import React, {Component} from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';

class DropdownExistingChat extends Component{
    state={
        users:[],
        selection: 'Emails of Users',
    }

    componentDidMount(){
        this.getAllUserEmails();
    }

    getAllUserEmails= async () =>{
        try {
            const allChatroomUsers = await axios(
                `http://localhost:5000/chatrooms/getAllUsers/${this.props.chatroom}`
            );

            let chatroomUserList = [];
            allChatroomUsers.data.forEach(user => {
                console.log("DropdownExistingChat chatroomUserList: " + user)
                if (user != this.props.current_user) {
                    chatroomUserList.push(user);
                }
            });

            console.log("DropdownExistingChat chatroomUserList: " + chatroomUserList);

            const allUsers = await axios(
                `http://localhost:5000/users/`
            );
            console.log('All User Emails', allUsers.data);

            let userList = [];
            allUsers.data.forEach(user => {
                console.log("DropdownExistingChat chatroomUserList: " + user)
                if (user._id != this.props.current_user) {
                    let flag = true;

                    for (let i=0; i<chatroomUserList.length; i++) {
                        if (chatroomUserList[i] == user._id) {
                            flag = false;
                        }
                    }

                    if (flag == true) {
                        userList.push(user.email);
                    }
                }
            });

            console.log("DropdownExistingChat: userList" + userList);

            this.setState({
                users: userList,
                chatroomUserList: chatroomUserList,
            });

        } 
        catch (err) {
            console.log(err);
        }
    }

    handleDropDownSelect = async (event) => {
        console.log("handleDropDownSelect");
        console.log("event.target", event.target);
        console.log("event.target.textContent", event.target.textContent);

        let newUser = await axios(`http://localhost:5000/users/userIdByEmail/${event.target.textContent}`);
        console.log("newUser.data: ", newUser.data);
        console.log("this.state.chatroomUserList: ", this.state.chatroomUserList);

        let userList = await axios(`http://localhost:5000/chatrooms/getAllUsers/${this.props.chatroom}`);
        console.log("userList.data: ", userList.data);

        userList.data.push(newUser.data)

        let url = `http://localhost:5000/chatrooms/${this.props.chatroom}`;
        await axios({
            method: 'put',
            url: url,
            data: {
                users: userList.data,
                isActive: true,
            }
        });

        // const allChatrooms = await axios(
        //     `http://localhost:5000/chatrooms/chatroomWithUserId/${this.props.current_user}`
        // );
        // console.log('All Chatroom Values', allChatrooms.data);

        // this.setState({
        //     chatrooms: allChatrooms.data,
        //     textAreaValue: '',
        //     selection: 'Emails of Users',
        // });

        // this.props.showChatrooms(allChatrooms.data);
    }

    render() {
        if (this.props.chatroom != this.state.chatroom) {
            this.getAllUserEmails();

            this.setState({
                chatroom: this.props.chatroom,
            })
        }
        
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

export default DropdownExistingChat;