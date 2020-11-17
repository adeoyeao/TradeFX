const express = require("express")
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")
const userModel = require("../models/userModel")
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.use(session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
            maxAge: 6048000
      }
}))

router.use(passport.initialize())
router.use(passport.session())

// Local Authentication
passport.use(userModel.createStrategy())
passport.use(serializeUser((user, done) => done(null, user.id)))
passport.use(deserializeUser((id, done) => {
      userModel.findById(id, (err, user) => {
            done(err, user)
      })
}))

router.post("/login", (req, res) => {
      const user = {
            username: req.body.username,
            password: req.body.password,
      }

      req.login(user, err => {
            err ? (console.error(err), res.json({message: "Login Failed"})) :
            passport.authenticate("local")((req, res) => {
                  res.json({message: "Login Succesful"})
            })
      })
})

router.post("/register", (req, res) => {
      userModel.register({username: req.body.usernname}, req.body.password, (err, user) => {
            err ? (console.error(err), res.json({message: "Registration Failed"})) :
            passport.authenticate("local")((req, res) => {
                  res.json({ message: "Registration Successful"})
            })
      })
})

// Facebook Authentication
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/login"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get("/auth/facebook", passport.authenticate("facebook"))
router.get("/auth/facebook/login",
  passport.authenticate("facebook", {
        failureRedirect: "/",
        successRedirect: "/tradefx"
      }),
)

// Google Authentication
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/login"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get("/auth/google", passport.authenticate("google", { scope: ['profile']}))
router.get("/auth/google/login",
      passport.authenticate("google", { 
            failureRedirect: "/",
            successRedirect: "/tradefx"
      }),   
)

// LinkedIn Authentication
passport.use(new LinkedInStrategy({
  clientID: LINKEDIN_KEY,
  clientSecret: LINKEDIN_SECRET,
  callbackURL: "http://localhost:5000/auth/linkedin/login",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, 
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      return cb(err, user);
    });
}));

router.get("/auth/linked",passport.authenticate("linkedin", { state: "SOME STATE" }))
router.get("/auth/linkedin/login", 
      passport.authenticate("linkedin", {
            failureRedirect: "/",
            successRedirect: "/tradefx"
      })
)

// Logout
router.get("/logout", (req, res) => {
      req.logout()
      res.end()
})