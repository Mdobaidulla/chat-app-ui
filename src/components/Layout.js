import React, {Component} from 'react';
import Profile from './profile/Profile'
import ChatRooms from './ChatRooms';
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import ChatroomControl from './ChatroomControl';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';


class Layout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current_user: this.props.currentUser._id,
      chatroom: '',
      chatrooms: [],
      currentUser:this.props.currentUser,
      userToEdit: {
        first_name: '',
        last_name: '',
        email: '',
        password:'',
        id: '',
      },
      showEditModal: false,
    }
  }

  showConversation = (chatroom) => {
    console.log('the chatroom is working');
    console.log("show Conversation: " + chatroom);
  
    this.setState({
      chatroom: chatroom,
    })
  }

  showChatrooms = (chatrooms) => {
    console.log('showChatrooms function');
    console.log("show Chatrooms: " + chatrooms);
    
    this.setState({
      chatrooms: chatrooms,
    })
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
              <div className="chat-room-header">
               <div className="profile_name"> 
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
              </div>
              <div className="chat-main-room">
                <div className="chat-main-room-left">
                  <div>Add Email Address</div>
                  <div>Press Enter to Open Chat Room:</div>
                   <ChatroomControl current_user={this.state.current_user} chatrooms={this.state.chatrooms}
                            showChatrooms={this.showChatrooms}/>
                 <ChatRooms current_user={this.state.current_user} showConversation={this.showConversation}
                    showChatrooms={this.showChatrooms} chatrooms={this.state.chatrooms}/>
                  </div>
                  <div className="chat-main-room-right">
                    <div className="conversation">
                    <Conversation chatroom={this.state.chatroom} currentUser={this.state.currentUser}/>
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