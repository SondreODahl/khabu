import React from 'react';
import { Client, Message } from '@stomp/stompjs';

class GreetButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recMessage: 'No received message' };
  }

  componentDidMount() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        const subscription = this.client.subscribe('/message/greeting', message => {
          console.log('Greeting received');
          console.log(message.body);
        });
      },
    });

    this.client.onStompError = function(frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  onButtonClick = () => {
    this.client.publish({ destination: '/app/greeting', body: 'Sup' });
  };

  onNotifiedSubscription = message => {
    console.log('message');
  };

  render() {
    return (
      <div>
        <div>Current message: {this.state.recMessage}</div>
        <button onClick={this.onButtonClick}>Send a message</button>
      </div>
    );
  }
}

export default GreetButton;
