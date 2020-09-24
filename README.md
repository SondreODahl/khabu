# Khabu
A digitalized version of the card game Khabu. You can find the rules [here](http://khabu.eu-north-1.elasticbeanstalk.com/rules)

## Technologies
The game is made with React Redux and Spring Boot. To handle real-time interactions we use the WebSocket protocol with Stomp.
To build and deploy our application we set up an AWS Codepipeline and used Elastic Beanstalk to deploy. 

### External Libraries

#### Front-end
To communicate with the back-end via the Stomp protocol, we utilize the [StompJs library](https://github.com/stomp-js/stompjs). For REST-communication, we use [Axios](https://github.com/axios/axios). [React Hook Form](https://react-hook-form.com/) handles the form input when joining a game. In order to achieve efficient state retrieval, we use both [reselect](https://github.com/reduxjs/reselect) and [re-reselect](https://github.com/toomuchdesign/re-reselect). [Redux-Thunk](https://github.com/reduxjs/redux-thunk) allows us to access state in our action creators. We also use [React Router](https://reactrouter.com/) to differentiate pages in our SPA. 



## Game logic
We developed the game logic with test-driven development. It is written in Java and we use JUnit5 as our testing framework.
For the rest of the back-end we use Spring-boot with Spring Websocket. 

## Local Setup
If you want to use the application locally, start by cloning the repository from Github. Next, cd to the front-end folder and install dependencies by typing `yarn`. To start the front-end, use `yarn run`. To start the back-end, cd to the back-end folder and type `mvn spring-boot:run`.





