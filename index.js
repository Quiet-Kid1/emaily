//const express = require("express")
import express from "express";
import "./models/users.js";
import "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import Keys from "./config/keys.js";

mongoose.connect(Keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [Keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
