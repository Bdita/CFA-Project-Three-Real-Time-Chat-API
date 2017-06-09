### About Project
  A restful chat API with express, mongo, passport, and socket. This project is done as a third major project of CFA. The API is built for a client who owns a data centre business.

### Design Process
#### Project Discovery:
  A requirement gathering workshop was conducted with client to explore more about his business problems and expectation.
  Following questions were asked and response(couple of word that come in his mind) was collected in sticky notes. Random thoughts were organised under specific topics which gave us a clear understanding of his business problems and possible solutions to work on. The client needed three solutions to solve his current problems.
  1. Responsive Website with CMS (for online presence and marketing purpose)
  2. Customer Support Chat service (to facilitate the frequent communication between his business clients and support staff)
  3. A feature to allow customers to calculate the price of cloud services

  For the scope of CFA's third project, we decided to start with chat feature (server side- restful API) due to the requirement of using JS stack.

  <img src="http://res.cloudinary.com/dihqhbf9i/image/upload/v1496965262/DSC_0047_btb0qv.jpg" alt="workshop image" />

  <img src="http://res.cloudinary.com/dihqhbf9i/image/upload/v1496965272/DSC_0053_y0keow.jpg" alt="workshop image" />

#### Project Charter:
  A project requirement documentation was prepared and signed off by the client. As the project progressed, the charter was revised as needed.

  <img src="http://res.cloudinary.com/dihqhbf9i/image/upload/v1496965439/Screen_Shot_2017-06-09_at_9.42.44_am_o2uoy9.png" alt="project charter" />

###  API Development(Agile):
  A full web solution architecture was designed. Then, the whole solution was divided into deliverable mini-projects, one of which includes chat API. API was built using express framework. User and session authentication is managed using passport and jsonwebtoken. Using socket.io, the server is made ready to listen to the clients messages. However, this functionality is not fully developed as it requires a client and further refactoring and modification.

  <img src="http://res.cloudinary.com/dihqhbf9i/image/upload/v1496965439/Screen_Shot_2017-06-09_at_9.42.44_am_o2uoy9.png" alt="app architecture" />

  <img src="http://res.cloudinary.com/dihqhbf9i/image/upload/v1496965956/Screen_Shot_2017-06-09_at_9.51.19_am_jimb3m.png" alt="project breakdown" />

### Installation Instruction for local use
#### Dependencies:
bcrypt-nodejs:
body-parser:
crypto:
ejs:
express:
express-session:
jsonwebtoken:
mocha:
mongoose:
morgan:
passport:
passport-jwt:
passport-local:
should:
socket.io:
supertest:

#### Requirements:
This application is made using node and npm. Please see below for specific version.
* node 6.10.3 - a server side JavaScript platform built on chrome v8 Javascript engine. It allows to write javascript based application that can be run outside of the browser.
* npm 3.10.10 - a package manager for javascript. It is used to install, share and distribute code and manage dependencies in projects.

#### Usage Instruction
Clone the repository.
```
$ cd repoName
$ npm install  //to install the dependencies in the local _modules folder
$ npm start  //to run the application
$ sudo mongod //to open and connect to database if using locally, open another terminal for this.
```
Use postman to interact with the API (Register, login, start new conversation, reply to a conversation, view user profile information(only the users can view their own profile-authentication)
