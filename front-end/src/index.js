import React from 'react';
import ReactDOM from 'react-dom';
import STOMPClient from './api/STOMPClient';

const App = () => {
  // const [restMsg, setRestMsg] = useState('');
  // useEffect(() => {
  //   (async () => {
  //     const result = await RESTServer.get('/api/hello');
  //     console.log(result);
  //     setRestMsg(result.data);
  //   })();
  // });
  return (
    <div>
      <STOMPClient />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
