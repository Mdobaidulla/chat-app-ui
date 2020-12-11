import React, { Component } from 'react';
import ContactItem from './ContactItem.js';
import { getUsers } from '../api';
import axios from 'axios';

class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: [],
        }
    }

    handleUserGet = async () => {
        // let userResults = await getUsers();
    
        const userResults = await axios.get(`http://localhost:3000/users/`);
        console.log(userResults);
        console.log(userResults.data);
    
        console.log("length of userResults " + userResults.data.length);
    
        this.setState({
          userList: userResults.data,
        });
    
        return userResults.data;
      }
        
    componentDidMount() {
        this.handleUserGet();

    };    

    render() {
        console.log("render ContactList");

        const allContacts = this.state.userList.map((contact, index) => {
            return <ContactItem key={index}
                contact={contact}
            />
        });
        return (
            <ul>
                {allContacts}
            </ul>
        );
    }
}

export default ContactList;