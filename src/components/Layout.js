import React, {Component} from 'react';
import Profile from './profile/Profile'
import ChatRooms from './ChatRooms';
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import ChatroomControl from './ChatroomControl';
import DropdownNewChat from './DropdownNewChat';
import DropdownExistingChat from './DropdownExistingChat';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';


class Layout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      // current_user: '5fd293f5366898c19ea1086d',  //Luke Skywalker
      // current_user: '5fd29550366898c19ea1086e',  //Han Solo
      current_user: this.props.currentUser._id,
      chatroom: '',
      chatrooms: [],
      users: [],
      currentUser:this.props.currentUser,
      userToEdit: {
        first_name: '',
        last_name: '',
        email: '',
        password:'',
        id: '',
      },
      showEditModal: false,
      highlight_chatroom: '',
      highlight_current_chatroom: '',
    }
  }

 

  showConversation = (chatroom) => {
    console.log('the chatroom is working');
    console.log("show Conversation: " + chatroom);

    let chatroom_to_highlight = this.state.highlight_chatroom;
    if (chatroom == this.state.highlight_chatroom) {
      chatroom_to_highlight = '';
    }

    this.setState({
      chatroom: chatroom,
      highlight_chatroom: chatroom_to_highlight,
    });

    this.handleHighlightCurrentChatroom(chatroom);
  }

  showChatrooms = (chatrooms) => {
    console.log('showChatrooms function');
    console.log("show Chatrooms: " + chatrooms);
    console.log("show Chatrooms.data: " + chatrooms.data);
    console.log("show Chatrooms.length: " + chatrooms.length);
    this.setState({
      chatrooms: chatrooms,
    });
  }
  
//PROFILE UPDATE

openAndEdit = (userFromTheList) => {
  console.log(userFromTheList, ' userToEdit  ');

  this.setState({
    showEditModal: true,
    userToEdit: {
      ...userFromTheList,
    },
  });
};

handleEditChange = (e) => {
  this.setState({
    userToEdit: {
      ...this.state.userToEdit,
      [e.currentTarget.name]: e.currentTarget.value,
    },
  });
};

handleHighlightChatroom = (chatroom) => {
  console.log("handleHighlightChatroom: " + chatroom);

  this.setState({
    highlight_chatroom: chatroom,
  });
};

handleHighlightCurrentChatroom = (chatroom) => {
  console.log("handleCurrentChatroom: " + chatroom);

  this.setState({
    highlight_current_chatroom: chatroom,
  });
};

//Seding update request for user profile
closeAndEdit = async (e) => {
  e.preventDefault();
  try {
    const editResponse = await axios.put(
      'http://localhost:5000/users/' +
       this.state.current_user,
        this.state.userToEdit
    );
    this.setState({
      showEditModal: false,
      currentUser: editResponse.data,
      current_user:editResponse.data._id,
    });
  } catch (err) {
    console.log(err);
  }
};


//LOG OUT 
logout= ()=>{
 this.props.setCurrentUser('')

}

  render(){
    console.log(this.state.currentUser,'printing current usere from state');
      return(
            <div className="chat-room">
              <div className="chat-room-header_container"> 
                <div className="left_header">
                  <i onClick={() => this.openAndEdit(this.state.currentUser)}>
                    <Icon color="black" name='setting' size='larg' />
                  </i> 
                  <Profile 
                    handleEditChange={this.handleEditChange}
                    open={this.state.showEditModal}
                    userToEdit={this.state.userToEdit}
                    closeAndEdit={this.closeAndEdit}
                  />
                  {this.state.currentUser.first_name}  {this.state.currentUser.last_name}
                </div>
                <div className="right_header">
                            <i onClick={() => this.logout()}>
                            <Icon color='red' name='power off' size='larg' />
                            </i> 
                </div>
              </div>
              <div className="chat-main-room">
                <div className="chat-main-room-left">
                  <DropdownNewChat users={this.state.users} current_user={this.state.current_user}
                    showChatrooms={this.showChatrooms}/>

                  <hr/>
                  <ChatRooms current_user={this.state.current_user} showConversation={this.showConversation}
                    showChatrooms={this.showChatrooms} chatrooms={this.state.chatrooms} 
                    highlight_chatroom={this.state.highlight_chatroom}
                    highlight_current_chatroom={this.state.highlight_current_chatroom}/>
                  <hr/>

                  {/* <h3>Add Users to Existing Chat:</h3>
                  <DropdownExistingChat users={this.state.users} current_user={this.state.current_user}
                    showChatrooms={this.showChatrooms} chatroom={this.state.chatroom}/> */}
                  </div>
                  <div className="chat-main-room-right">
                    <div className="conversation" >
                    <Conversation chatroom={this.state.chatroom} currentUser={this.state.currentUser}
                      handleHighlightChatroom={this.handleHighlightChatroom}/>
                    </div>
                    <div className="chat-main-room-footer">
                    <ChatBox current_user={this.state.current_user} chatroom={this.state.chatroom}/>
                    </div>
                  </div>
              </div>
            </div> 
        )
    }
}

export default Layout;