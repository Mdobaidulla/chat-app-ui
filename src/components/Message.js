import React, {Component} from 'react';

class Message extends Component{
    state={
        userID: '',
        first_name: '',
       }

    componentDidMount(){
        this.setState({
            chatroomId: this.props.chatroom_id
        });
    }

    render(){
        return(
            <div className="left aligned column">
                <div className="ui vertical fluid menu contcat">
                
                        <tr>
                        <img src="https://res.cloudinary.com/dpggpg7su/image/upload/v1607664270/samples/0-02-01-0f58eb7f4cdf9b213c846bef3dc94c19f8969c3bf87783242ea6108cfb8a7313_1c6da0a1ccaa58_qmytn8.jpg"
                        height="50" width="50" className="images"
                        />{this.props.user}: {this.props.message}
                        </tr>
                
                </div>
            </div>
        )
    }
}

export default Message;