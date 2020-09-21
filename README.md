# Khabu
A digitalized version of the card game Khabu. You can find the rules at http://khabu.eu-north-1.elasticbeanstalk.com/rules

## Technologies
The game is made with React-Redux and Spring-boot. To handle real-time interactions we have used the WebSocket protocol with Stomp.
To build and deploy our application we set up an AWS Codepipeline and used ECS Beanstalk to deploy. 

## Game logic
We developed the game logic with test-driven development. It is written in java and we used JUnit 5 as our testing framework.
For the rest of the back-end we used Spring-boot with Spring Websocket. 




