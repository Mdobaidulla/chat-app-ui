import React, {Component} from 'react';
import axios from 'axios'
import Contact from './Contact'
class Contacts extends Component{
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
		 <Contact contacts={this.state.contacts}/>
         </>
        )
    }
}

export default Contacts;