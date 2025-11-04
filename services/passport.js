import passport from "passport";
import passportGoogleOAuth20 from "passport-google-oauth20";
import Keys from "../config/keys.js";
import mongoose from "mongoose";

const User = mongoose.model("users");

const GoogleStrategy = passportGoogleOAuth20.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.googleClientID,
      clientSecret: Keys.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
