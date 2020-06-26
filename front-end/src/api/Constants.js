const prod = {
  url: {
    API_URL: 'http://khabu.eu-north-1.elasticbeanstalk.com',
    WEB_SOCKET_URL: 'ws://khabu.eu-north-1.elasticbeanstalk.com/ws',
  },
};
const dev = {
  url: {
    API_URL: 'http://localhost:8080',
    WEB_SOCKET_URL: 'ws://localhost:8080/ws',
  },
};

// Exports production url if yarn build is used
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
