import React, {Component} from 'react';
import ChatRooms from './ChatRooms'
import Profile from './profile/Profile'





class Layout extends Component{
  constructor(props) {
    super(props);

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
                  <ChatRooms/>
                </div>
            </div>
            <div className="right_part">
                <div className="header_right_part">
                  header left
                </div>
                <div className="right_main_part">
                   All the text will go here 
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