import React, {Component} from 'react';

class DisplayChatBox extends Component {
    render() { 
        return (
            <div>
                    {this.props.chatHistory.map((message, i) =>{
                        return(
                            <p className= "message">{message.message}</p>

                        )
                    })}

            </div> );    }
}
 
export default DisplayChatBox;