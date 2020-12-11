import React, {Component} from 'react'
import Person from './Person'
class ChatRoom extends Component{
   
    render(){
        const allContacts = this.props.contacts.map((contact, index)=>{
            return(
                <Person key={index} first_name={contact.first_name}
                last_name={contact.last_name}
                />
            )
        })
   return(
       <>
       {allContacts}
       </>
   ) 
    }
}
export default ChatRoom;