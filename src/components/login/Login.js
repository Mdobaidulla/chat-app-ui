import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

class Login extends Component {
    constructor(){
        super();
        this.state = {
          email: '',
          password: ''
        }
      }
      handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
      }
      render(){
        return (
          <Segment style={{ width: '100%' }} className="login_panel">
            <h2>Login</h2>
            <Form onSubmit={(e) => {
                this.props.login(e, this.state)
                this.setState({ email:'',password:''})
                }}>
              <Form.Input type='text'  name='email' value={this.state.email} placeholder="Email" onChange={this.handleChange} required/>
              <Form.Input type='text' name='password' value={this.state.password} placeholder="Password" onChange={this.handleChange} required/>
              <Button  type='Submit'>Login</Button>
            </Form>
          </Segment>
          )
      }
}

export default Login;