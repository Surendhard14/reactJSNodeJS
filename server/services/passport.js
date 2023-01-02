const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const user = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then((userDetails) => done(null, userDetails));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      user.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new user({ googleId: profile.id })
            .save()
            .then((userDetails) => done(null, userDetails));
        }
      });
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
    }
  )
);
