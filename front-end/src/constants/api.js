const dev = {
  url: {
    API_URL: 'http://localhost:8080',
    WEB_SOCKET_URL: 'ws://localhost:8080/ws',
  },
};

const prod = {
  url: {
    API_URL: 'https://khabu.azurewebsites.net',
    WEB_SOCKET_URL: 'wss://khabu.azurewebsites.net/ws',
  },
};

// Exports production url if yarn build is used
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
