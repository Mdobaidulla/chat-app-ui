import React, {Component} from 'react';
import Profile from './profile/Profile'
import ChatRooms from './ChatRooms';
import Conversation from './Conversation';
import ChatBox from './ChatBox';

class Layout extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      current_user: '5fd58c2dffb1f422940fe756',  //Luke Skywalker
      // current_user: '5fd29550366898c19ea1086e',  //Han Solo
      chatroom: '',
    }
  }

  showConversation = (chatroom) => {
    console.log('the chatroom is working');
    console.log("show Conversation: " + chatroom);
    
    this.setState({
      chatroom: chatroom,
    })
  }
  
  render(){

      return(
            <div className="chat-room">
              <div className="chat-room-header">
              Header
              </div>
              <div className="chat-main-room">
                <div className="chat-main-room-left">
                <ChatRooms current_user={this.state.current_user} showConversation={this.showConversation}/>
                  </div>
                  <div className="chat-main-room-right">
                    <div className="conversation">
                    <Conversation chatroom={this.state.chatroom}/>
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