import React, {Component} from 'react';
import Profile from './profile/Profile'
import ChatRooms from './ChatRooms';
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import ChatroomControl from './ChatroomControl';

class Layout extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      current_user: '5fd293f5366898c19ea1086d',  //Luke Skywalker
      // current_user: '5fd29550366898c19ea1086e',  //Han Solo
      chatroom: '',
      chatrooms: [],
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
  
  render(){

      return(
            <>
       
            <div className="left_part">
                <div className="header_left_part">
                  <Profile />
                </div>
                <div className="search_box">
                    {/* this input box will be in seperate component */}
                 Search
                </div>
                <div className="contract_box">
                  Contact component will be here
                  <ChatRooms current_user={this.state.current_user} showConversation={this.showConversation}
                    showChatrooms={this.showChatrooms} chatrooms={this.state.chatrooms}/>
                </div>
                <div className="right_footer">
                  <div>Add Email Address</div>
                  <div>Press Enter to Open Chat Room:</div>
                  <ChatroomControl current_user={this.state.current_user} chatrooms={this.state.chatrooms}
                    showChatrooms={this.showChatrooms}/>
                </div>
            </div>
            <div className="right_part">
                <div className="header_right_part">
                </div>
                <div className="right_main_part">
                   <Conversation chatroom={this.state.chatroom}/>
                </div>
                <div className="right_footer">
                   <div>Press Enter to Send:</div>
                   <ChatBox current_user={this.state.current_user} chatroom={this.state.chatroom}/>
                </div>
                  
            </div>
            </>
        )
    }
}

export default Layout;