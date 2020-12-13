import './App.css';
import Layout from './components/Layout'
import Landing from './components/landing/Landing'
import logo from './images/logo.png'
import React, { Component } from 'react';

class App extends Component{
constructor(props){
super(props)
this.state={
  currentUser:''
  }  
}

setCurrentUser= (currentUser)=>{
  this.setState({
   // currentUser: [...this.state.currentUser, currentUser],
   currentUser:currentUser
   
  });
}
  render(){
  return ( 
  <>
  <header >
    <div className="header-container" >
        <img className="logos" src={logo}/>
            <h1 className="main-header">Pru Full-stack Developers</h1>
        </div>
       
  </header>
   <main>
      {/* {'current user: '+this.state.currentUser} */}
      {
      !this.state.currentUser
      ?<Landing setCurrentUser={this.setCurrentUser}/>
      :
      <div className='pages'>
    {this.state.currentUser == null}
      <Layout /> 
      </div> 
  }
  </main>
  <footer>
    Contact:
  </footer>

</>
    
  )
  };
}

export default App;
