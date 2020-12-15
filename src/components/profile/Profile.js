import React, {Component} from 'react'
import {Modal, Header, Content, Form, Label, Button} from 'semantic-ui-react';

class Profile extends Component{

    render(){
        return(
            <Modal open={this.props.open} className="ui small modal">
            <Header>Your Profile</Header>
            <Modal.Content>
              <Form  onSubmit={this.props.closeAndEdit}
              >
                <Label>First Name:</Label>
                <Form.Input
                  type="text"
                  name="first_name"
                  value={this.props.userToEdit.first_name}
                  onChange={this.props.handleEditChange}
                />
                <Label>Last Name:</Label>
                <Form.Input
                  type="text"
                  name="last_name"
                   value={this.props.userToEdit.last_name}
                   onChange={this.props.handleEditChange}
                />
                <Label>Email:</Label>
                <Form.Input
                  type="text"
                  name="email"
                  value={this.props.userToEdit.email}
                  onChange={this.props.handleEditChange}
                />
                <Modal.Actions>
                  <Button color="green" type="submit">
                    UPDATE
                  </Button>
                </Modal.Actions>
              </Form>
            </Modal.Content>
          </Modal>
        )
    }
}
export default Profile;