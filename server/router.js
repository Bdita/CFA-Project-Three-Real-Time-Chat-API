const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const ChatController = require('./controllers/chat');
const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// set up routes
module.exports = function(app) {
  // Initializing route groups for api
  const apiRoutes = express.Router();
  const apiAuthRoutes = express.Router();
  const apiChatRoutes = express.Router();
  const apiUserRoutes = express.Router();
  // Initializing route groups for app
  const mainRoutes = express.Router();
  const authRoutes = express.Router();

  //=========================
  // Main Auth Routes
  //=========================
  //Set auth routes as subgroup/middleware to mainRoutes
  mainRoutes.use('/', authRoutes);

  // Registration route
  authRoutes.get('/register', function(req, res) {
    res.render('register');
  });

  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.get('/login', function(req, res) {
    res.render('login');
  });

  authRoutes.post('/login', AuthenticationController.login);

  //dashboard route

  authRoutes.get('/dashboard', function(req, res) {
    res.render('dashboard');
  });

  //=========================
  // API Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', apiAuthRoutes);

  // Registration route
  apiAuthRoutes.post('/register', AuthenticationController.registerApi);

  // Login route
  apiAuthRoutes.post('/login', requireLogin, AuthenticationController.loginApi);


  //= ========================
  // API User Routes
  //= ========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', apiUserRoutes);

  // View user profile route
  apiUserRoutes.get('/:userId', requireAuth, UserController.viewProfileApi);

  //= ========================
  // API Chat Routes
  //= ========================
  // Set chat routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/chat', apiChatRoutes);

  // View messages to and from authenticated user
  apiChatRoutes.get('/', requireAuth, ChatController.getConversationsApi);

  // Retrieve single conversation
  apiChatRoutes.get('/:conversationId', requireAuth, ChatController.getConversationApi);

  // Send reply in conversation
  apiChatRoutes.post('/:conversationId', requireAuth, ChatController.sendReplyApi);

  // Start new conversation
  apiChatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversationApi);

// Set url for API group routes
  app.use('/api', apiRoutes);
  app.use('/', mainRoutes);
};
