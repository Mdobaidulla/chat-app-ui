import React, {Component} from 'react'
import axios from 'axios'
import CreateUser from '../createuser/CreateUser';
import Login from '../login/Login'

class Landing extends Component{
    state = {
        users: [],
        login:[],
        createUserSucceesMessage:'',
        createUserErrorMessage:'',
        loginErrorMessage:'',
      }
    /**
     * This method will take the registration from value and will insert the value in database using
     * post request /users
     * SUCCESS: it will provide the success message UI
     * ERROR: It will provide error message on the UI
    */
     crateUser = async (e, user) => {
        e.preventDefault();
        try {
          const createUserResponse = await axios.post(
            process.env.REACT_APP_API_URL+`/users`,
              user,{
              headers: {
                'Content-Type': 'application/json'
              }
            }
           ).then((response)=>{
            this.setState({
            createUserSucceesMessage:'Please verify your email to complete the registration',
            createUserErrorMessage:'',
            })
            }
           ).catch((error)=>{
            this.setState({
              createUserSucceesMessage:'',
              createUserErrorMessage:'Registration is not successful!!',
              })
           });
          this.setState({
            users: [...this.state.users, createUserResponse.data.data],
          });
        } catch (err) {
          console.log('error', err);
          
        }
      };
    
/**
 * This method will take email and password and will send a post call
 * for verifying from databased 
 * End poin: /sessions
 * SUCCESS: It will login to user account and display chat window
 * ERROR: It will display error message 
 * @param {event listener} e 
 * @param {email, password} login 
 */
login = async (e, login) => {
  e.preventDefault();
  try {
    const loggedInUserResponse = await axios.post(
      process.env.REACT_APP_API_URL+'/sessions',
        login,{
        headers: {
          'Content-Type': 'application/json'
        }
      } 
    ).catch((res)=>{
        this.setState({
          loginErrorMessage:'Incorect username or password'
        })
    });
    
    this.setState({
      login: [...this.state.login, loggedInUserResponse.data],
     
    });
    //passing the current user value in the parent component called App.js
    this.props.setCurrentUser(loggedInUserResponse.data);
  } catch (err) {
    console.log('error', err);
  }
};
   
render(){
   return(
    <div className="landing_page">
        <div className="left_part">
        <h1>Stay Connected?</h1>
          <Login login={this.login}
          loginErrorMessage={this.state.loginErrorMessage}
          />
        </div>
        <div className="right_part">
          <p className="inof">
            This is a web based chat app that will allow all the registered people to chat with each other.
            The main goal to keep all the Pru Full-stake developer connected and if anyone interested to take this app 
            little father. Most welcome to join and start working on this app. </p>
          <CreateUser crateUser={this.crateUser} 
          message={this.state.createUserErrorMessage}
          successMessage={this.state.createUserSucceesMessage}
          />
        </div>
    </div>

   ) 
    }
}
export default Landing;