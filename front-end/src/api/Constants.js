const prod = {
  url: {
    API_URL: "http://khabu.eu-north-1.elasticbeanstalk.com",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:8080",
  },
};

// Exports production url if yarn build is used
export const config = process.env.NODE_ENV === "development" ? dev : prod;
