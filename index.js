import express from 'express';
import mongoose from 'mongoose';

import { signupValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import User from './models/User.js';
import * as UserController from './controllers/UserController';

mongoose.connect('mongodb+srv://admin:asdfghqwerty@cluster0.pxom3we.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB ok')
    })
    .catch((err) => {
        console.log('DB error', err);
    });
const PORT = 4444;

const app = express();

app.use(express.json());

app.post('/auth/signin', UserController.signin);
app.post('/auth/signup', signupValidation, UserController.signup);
app.get('/auth/me', checkAuth, UserController.me);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server has been started on port: ' + PORT);

});