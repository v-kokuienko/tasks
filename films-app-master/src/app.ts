import express from 'express';
import { RegisterRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/error-handler';
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const config = {
  authRequired: process.env.authRequired,
  auth0Logout: process.env.auth0Logout,
  secret: process.env.auth0secret,
  baseURL: process.env.auth0baseURL,
  clientID: process.env.auth0clientID,
  issuerBaseURL: process.env.auth0issuerBaseURL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(requiresAuth());

app.use(errorHandler)

RegisterRoutes(app);

export default app;