import React, {Component} from 'react';
import ChatRooms from './ChatRooms';
import Conversation from './Conversation';

class Layout extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      current_user: '5fd293f5366898c19ea1086d',
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
            <>
       
            <div className="left_part">
                <div className="header_left_part">
                  Your profile
                </div>
                <div className="search_box">
                    {/* this input box will be in seperate component */}
                 Search
                </div>
                <div className="contract_box">
                  Contact component will be here
                  <ChatRooms current_user={this.state.current_user} showConversation={this.showConversation}/>
                </div>
            </div>
            <div className="right_part">
                <div className="header_right_part">
                  header left
                </div>
                <div className="right_main_part">
                   <Conversation chatroom={this.state.chatroom}/>
                </div>
                <div className="right_footer">
                   Send text conponent will be here
                </div>
                  
            </div>
            </>
        )
    }
}

export default Layout;