import React, {Component} from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

class Message extends Component{
    state={
        user:'',
        id: '',
        first_name: '',
        last_name: '',
        message: '',
        timestamp: '',
        datestamp: '',
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

        let monthNum = date.getUTCMonth();
        let month = '';
        switch(monthNum) {
            case 0:
                month = "Jan";
                break;
            case 1:
                month = "Feb";
                break; 
            case 2:
                month = "Mar";
                break;
            case 3:
                month = "Apr";
                break;
            case 4:
                month = "May";
                break; 
            case 5:
                month = "Jun";
                break;
            case 6:
                month = "Jul";
                break;
            case 7:
                month = "Aug";
                break; 
            case 8:
                month = "Sep";
                break;
            case 9:
                month = "Oct";
                break;
            case 10:
                month = "Nov";
                break; 
            case 11:
                month = "Dec";
                break;   
        }

        let dayNum = date.getDay();
        let day = '';
        switch(dayNum) {
            case 0:
                day = "Sun";
                break;
            case 1:
                day = "Mon";
                break; 
            case 2:
                day = "Tue";
                break;
            case 3:
                day = "Wed";
                break;
            case 4:
                day = "Thr";
                break; 
            case 5:
                day = "Fri";
                break;
            case 6:
                day = "Sat";
                break;  
        }

        let ampm;
        if (hours >= 12) {
            ampm = 'pm';
        }
        else {
            ampm = 'am';
        }

        if (hours > 12) {
            hours = hours % 12;
        }
        else if (hours == 0) {
            hours = 12;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        // if (seconds < 10) {
        //     seconds = '0' + seconds;
        // }

        let timestamp = `  ` + hours + ":" + minutes + ' ' + ampm;
        timestamp = timestamp + ' ' + day + ', ' + month + '. ' + date.getDate();
        console.log('timestamp is ', timestamp);

        let datestamp = day + ', ' + month + '. ' + date.getDate();
        let shortTimeStamp = hours + ":" + minutes + ' ' + ampm;
        
        this.setState({
            first_name: first_name.data,
            last_name: last_name.data,
            user: this.props.user,
            timestamp: timestamp,
            datestamp: datestamp,
            shortTimeStamp: shortTimeStamp,
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
                                    <i onClick={this.deleteMessage}> <Icon name='trash alternate outline' size='small' /></i>
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
                                <i onClick={this.deleteMessage}> <Icon name='trash alternate outline' size='small' /></i>  
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