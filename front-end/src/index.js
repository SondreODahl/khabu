import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import RESTServer from './api/RESTServer';
import GreetButton from './components/GreetButton';

const App = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    (async () => {
      const result = await RESTServer.get('/api/hello');
      console.log(result);
      setMessage(result.data);
    })();
  });
  return (
    <div>
      {message}
      <GreetButton />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
