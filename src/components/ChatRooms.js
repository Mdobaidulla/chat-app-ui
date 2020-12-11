import React, {Component} from 'react';
import axios from 'axios'
import ChatRoom from './ChatRoom'
class ChatRooms extends Component{
    state={
        contacts:[]
       }
   
    componentDidMount(){
        this.getAllContacts();
        
    }
    getAllContacts= async () =>{
        try {
        const allContacts =await axios(
            'http://localhost:5000/users'
        );
        console.log('All Value',allContacts.data);
        await this.setState({
            contacts:allContacts.data
            
        })

    } catch (err) {
        console.log(err);
      }
      
    }

    render(){
        return(
         <>    
		 <ChatRoom contacts={this.state.contacts}/>
         </>
        )
    }
}

export default ChatRooms;