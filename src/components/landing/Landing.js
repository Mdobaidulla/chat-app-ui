import React, {Component} from 'react'
import axios from 'axios'
import CreateUser from '../createuser/CreateUser';
import Login from '../login/Login'

class Landing extends Component{
    state = {
        users: [],
        login:[]
      }
    
     crateUser = async (e, user) => {
        e.preventDefault();
        try {
          // The createdDogResponse variable will store the response from the Flask API
          const createUserResponse = await axios.post(
            process.env.REACT_APP_API_URL+`/users`,
              user,{
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          this.setState({
            users: [...this.state.users, createUserResponse.data.data],
          });
        } catch (err) {
          console.log('error', err);
        }
      };
    
//Login verification:
//sending username and password from ui and validating from
//DB using exprees post request with endpoin sessions
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
    );
    
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
          <Login login={this.login}/>
        </div>
        <div className="right_part">
          <p className="inof">
            This is a web based chat app that will allow all the registered people to chat with each other.
            The main goal to keep all the Pru Full-stake developer connected and if anyone interested to take this app 
            little father. Most welcome to join and start working on this app. </p>
          <CreateUser crateUser={this.crateUser}/>
        </div>
    </div>

   ) 
    }
}
export default Landing;