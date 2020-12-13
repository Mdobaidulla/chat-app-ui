import React, {Component} from 'react';
import axios from 'axios';

class Message extends Component{
    state={
        user:'',
        first_name: '',
        last_name: '',
        message: '',
        timestamp: '',
       }
   
    componentDidMount(){
        this.getName();
        
    }
    getName= async () =>{
        try {
        const first_name =await axios(
            `http://localhost:5000/users/first_name/${this.props.user}`
        );
        console.log('first_name', first_name.data);

        const last_name =await axios(
            `http://localhost:5000/users/last_name/${this.props.user}`
        );
        console.log('last_name', last_name.data);

        let date = new Date(this.props.timestamp);
        let timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        timestamp = timestamp + ' ' + '(' + (Number(date.getMonth()) + 1) + '-' + date.getDay() + '-' + date.getFullYear() + ')';
        console.log('timestamp is ', timestamp);
        
        this.setState({
            first_name: first_name.data,
            last_name: last_name.data,
            user: this.props.user,
            timestamp: timestamp,
        });

    } catch (err) {
        console.log(err);
      }
      
    }

    render(){
        if (this.props.user != this.state.user) {
            this.getName();
        }
        
        let name = '';
        if ((this.state.first_name != '') && (this.state.first_name != '')) {
            name = this.state.first_name + ' ' + this.state.last_name;
        }
        else {
            name = this.props.user;
        }

        return(
            <div className="left aligned column">
                <div className="ui vertical fluid menu contcat">
                
                        <tr>
                        <img src="https://res.cloudinary.com/dpggpg7su/image/upload/v1607664270/samples/0-02-01-0f58eb7f4cdf9b213c846bef3dc94c19f8969c3bf87783242ea6108cfb8a7313_1c6da0a1ccaa58_qmytn8.jpg"
                        height="50" width="50" className="images"
                        />{name}: {this.state.timestamp}
                        </tr>
                        <tr>
                            {this.props.message}
                        </tr>
                
                </div>
            </div>
        )
    }
}

export default Message;