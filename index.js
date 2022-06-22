import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { signupValidation, signinValidation, postCreateValidation } from './validations.js';
import { UserController, PostController } from './controllers/index.js';

mongoose.connect('mongodb+srv://admin:asdfghqwerty@cluster0.pxom3we.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB ok')
    })
    .catch((err) => {
        console.log('DB error', err);
    });

const PORT = 4444;

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/signin', signinValidation, handleValidationErrors, UserController.signin);
app.post('/auth/signup', signupValidation, handleValidationErrors, UserController.signup);
app.get('/auth/me', checkAuth, UserController.me);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getOnePost);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.removeOnePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.updatePost);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server has been started on port: ' + PORT);

});