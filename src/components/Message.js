import React, {Component} from 'react';
import axios from 'axios';

class Message extends Component{
    state={
        user:'',
        id: '',
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
        const first_name = await axios(
            `http://localhost:5000/users/first_name/${this.props.user}`
        );
        console.log('first_name', first_name.data);

        const last_name = await axios(
            `http://localhost:5000/users/last_name/${this.props.user}`
        );
        console.log('last_name', last_name.data);

        let date = new Date(this.props.timestamp);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let ampm;
        if (hours > 12) {
            ampm = 'pm';
        }
        else {
            ampm = 'am';
        }

        hours = hours % 12;

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        let timestamp = hours + ":" + minutes + ":" + seconds + ' ' + ampm;
        timestamp = timestamp + ' ' + '(' + (Number(date.getUTCMonth()) + 1) + '-' + date.getDate() + '-' + date.getFullYear() + '):';
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

    deleteMessage = async () => {
        console.log("Delete Message: " + this.props.id);

        const chat = await axios({
            method: 'delete',
            url: `http://localhost:5000/chats/${this.props.id}`
        });

        this.props.getConversation();
    }

    render(){
        if (this.props.id != this.state.id) {
            this.getName();

            this.setState({
                id: this.props.id,
            })
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
                        <button onClick={this.deleteMessage}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Message;