import React, {Component} from 'react';
import Contacts from './Contacts'

class Layout extends Component{
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
                  <Contacts/>
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