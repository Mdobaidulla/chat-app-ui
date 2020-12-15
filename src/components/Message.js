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
        currentUser:this.props.currentUser,
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
        // let seconds = date.getSeconds();

        let month = Number(date.getUTCMonth()) + 1;

        let ampm;
        if (hours >= 12) {
            ampm = 'pm';
        }
        else {
            ampm = 'am';
        }

        hours = hours % 12;

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        // if (seconds < 10) {
        //     seconds = '0' + seconds;
        // }

        let timestamp = hours + ":" + minutes + ' ' + ampm;
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
            <>
                        <br></br>  
                        {this.props.currentUser._id == this.props.user ?
                        <div className="user_a_massages">
                            <div>
                            </div>
                            <div className="message_layout_a">
                                <div className="message_layout_header">
                                    <div >
                                       {name}
                                    </div>
                                    <div>
                                      {this.state.timestamp}
                                    </div>  
                                </div>
                                <div className="actual_message">
                                     {this.props.message}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="user_a_massages">
                        
                        <div className="message_layout_b">
                            <div className="message_layout_header">
                                <div >
                                   {name}
                                </div>
                                <div>
                                  {this.state.timestamp}
                                </div>  
                            </div>
                            <div className="actual_message">
                                 {this.props.message}
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                        }
                        
              
            </>
        )
    }
}

export default Message;