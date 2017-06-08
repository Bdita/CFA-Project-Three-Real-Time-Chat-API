const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const config = require('../config/main');
const setUserInfo = require('../helpers').setUserInfo;
const getRole = require('../helpers').getRole;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}
//............................................APP(views)...................................................
//========================================
// login function for app (views)
//========================================
exports.login = function(req, res, next) {
  passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true});
}


// router.post('/login',
//   passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
//   function(req, res) {
//     res.redirect('/');
//   });
//=================================================
// Registration function for app(views)
//=================================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const companyName = req.body.companyName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if company name not provided
  if (!companyName) {
    return res.status(422).send({ error: 'You must enter your company name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        profile: { firstName: firstName, lastName: lastName, companyName: companyName }
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);
      });
      res.render('/login');
  });
}

// ............................................API........................................................
//========================================
// login function for login Route API
//========================================
exports.loginApi = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}


//=================================================
// Registration function for registration route API
//=================================================
exports.registerApi = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const companyName = req.body.companyName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if company name not provided
  if (!companyName) {
    return res.status(422).send({ error: 'You must enter your company name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        profile: { firstName: firstName, lastName: lastName, companyName: companyName }
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

//========================================
// Authorization Middleware API?????????
//========================================

// Role authorization check
// exports.roleAuthorization = function(role) {
//   return function(req, res, next) {
//     const user = req.user;
//
//     User.findById(user._id, function(err, foundUser) {
//       if (err) {
//         res.status(422).json({ error: 'No user was found.' });
//         return next(err);
//       }
//
//       // If user is found, check role.
//       if (getRole(foundUser.role) >= getRole(requiredRole)) {
//         return next();
//       }
//
//       res.status(401).json({ error: 'You are not authorized to view this content.' });
//     })
//   }
// }
