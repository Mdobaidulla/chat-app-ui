import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

class CreateUser extends Component {
    constructor(){
        super();
    
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          image: ''
        }
      }
      handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
      }
      render(){
        return (
            <>

          <h1>Do not have Account?</h1>
          <p>SignUp now, it's free!!!</p>  
          <Segment style={{ width: '100%' }} >
            <div className="createUserMessage"> 
              <h2>SignUp</h2>
              <p className="errorMessage">{this.props.message}</p>
              <p className="successMessage">{this.props.successMessage}</p>
            </div>
            <Form onSubmit={(e) => {
                this.props.crateUser(e, this.state)
                this.setState({ first_name:'',last_name:'',email:'',password:''})
                }}>
              <Form.Input type='text' name='first_name' value={this.state.first_name} placeholder="First Name" onChange={this.handleChange} required/>
              <Form.Input type='text' name='last_name' value={this.state.last_name} placeholder="Last Name" onChange={this.handleChange} required/>
              <Form.Input type='text' name='email' value={this.state.email} placeholder="Email" onChange={this.handleChange} required/>
              <Form.Input type='password' name='password' value={this.state.password} placeholder="Password" onChange={this.handleChange} required/>
              <Button className="regi-btn" type='Submit'>Submit</Button>
            </Form>
          </Segment>
          <br></br>
          </>
          )
      }
}

export default CreateUser;