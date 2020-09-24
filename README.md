# Khabu
A digitalized version of the card game Khabu. You can find the rules [here](http://khabu.eu-north-1.elasticbeanstalk.com/rules)

## Technologies
The game is made with React Redux and Spring Boot. To handle real-time interactions we use the WebSocket protocol with Stomp.
To build and deploy our application we set up an AWS Codepipeline and use Elastic Beanstalk to deploy. 

### External Libraries

#### Front-end
- [StompJs library](https://github.com/stomp-js/stompjs) Communication with the back-end via the Stomp protocol.
- [Axios](https://github.com/axios/axios). REST-communication with back-end.
- [React Hook Form](https://react-hook-form.com/). Handles the form input when joining a game. 
- [reselect](https://github.com/reduxjs/reselect) and [re-reselect](https://github.com/toomuchdesign/re-reselect). To achieve efficient Redux state retrieval.
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk). Allows us to access state in our action creators.
- [React Router](https://reactrouter.com/). To differentiate pages in our SPA. 



## Game logic
We developed the game logic with test-driven development. It is written in Java and we use JUnit5 as our testing framework.
For the rest of the back-end we use Spring-boot with Spring Websocket. 

## Local Setup
If you want to use the application locally, start by cloning the repository from Github. Next, cd to the front-end folder and install dependencies by typing `yarn`. To start the front-end, use `yarn run`. To start the back-end, cd to the back-end folder and type `mvn spring-boot:run`.





