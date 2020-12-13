import React, {Component} from 'react';

class Person extends Component{
    state={
        chatroomId: '',
       }

    componentDidMount(){
        this.setState({
            chatroomId: this.props.chatroom_id
        });
    }
    render(){
        return(
            <div className="left aligned column" onClick={() => this.props.showConversation(this.props.chatroom_id)}>
                <div className="ui vertical fluid menu contcat">
                
                        <tr>
                        <img src="https://res.cloudinary.com/dpggpg7su/image/upload/v1607664270/samples/0-02-01-0f58eb7f4cdf9b213c846bef3dc94c19f8969c3bf87783242ea6108cfb8a7313_1c6da0a1ccaa58_qmytn8.jpg"
                        height="50" width="50" className="images"
                        />{this.props.first_name} {this.props.last_name } {this.props.chatroom_id}
                        </tr>
                
                </div>
            </div>
        )
    }
    clickingOnChatRoom(chatroomId){
        console.log('my chatroom is working');
        console.log('my chatroom is ' + chatroomId);
    }
}

export default Person;