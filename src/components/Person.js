import React, {Component} from 'react';

class Person extends Component{
   
    render(){
        return(
        <div className="left aligned columnn" onClick={this.clickingOnChatRoom}>
            <div className="ui vertical fluid menu contcat">
               
                    <tr>
                    <img src="https://res.cloudinary.com/dpggpg7su/image/upload/v1607664270/samples/0-02-01-0f58eb7f4cdf9b213c846bef3dc94c19f8969c3bf87783242ea6108cfb8a7313_1c6da0a1ccaa58_qmytn8.jpg"
                     height="50" width="50" className="imgages"
                    />{this.props.first_name} {this.props.last_name }
                    </tr>
               
            </div>
        </div>
       
        )
    }
    clickingOnChatRoom(){
        console.log('my chatroom is working');
    }
}

export default Person;