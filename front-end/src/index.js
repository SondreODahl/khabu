import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Server from './api/Server';

const App = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchMessage = async () => {
      const result = await Server.get('/api/hello');
      console.log(result);
      setMessage(result.data);
    };
    fetchMessage();
  });

  return <div>{message}</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
