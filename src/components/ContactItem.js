import React, { Component } from 'react';


class ContactItem extends Component {
    
    render() {         
        
        return (
            <div>
                <div>{this.props.contact.first_name} {this.props.contact.last_name}</div>
            </div>
        );
    }
}

export default ContactItem; 