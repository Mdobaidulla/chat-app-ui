import React, {Component} from 'react'
import axios from 'axios'

class Profile extends Component{
    state={
        user:{},
        image:'',
        contentType:'',
       }
   
    componentDidMount(){
        this.user();
        
    }
    user= async () =>{
        try {
        const user =await axios(
            'http://localhost:5000/users/5fd27fb35aa2d12d587a9d6c'
        );
        console.log('one User',user.data.image.contentType);
        await this.setState({
            user:user.data ,
            image:user.data.image.data.data,
            contentType:user.data.image.contentType
        })

    } catch (err) {
        console.log(err);
      }
      
    }

    render(){
      

        return(
         <> 
       {/* {this.state.image ? <img src={`data:image/jpeg;base64,${this.state.image.toString('base64')}`}/>: 'no image '} */}
        {this.state.user.first_name} {this.state.user.last_name}
 
         </>
        )
    }
}
export default Profile;