require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const petRouter = require('./routes/pet');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, maxAge: 60 * 60 * 1000, httpOnly: true },
//     name: 'userCookie',
//     store: new FileStore(),
//   }),
// );

app.use('/pet', petRouter);
app.use('/auth', authRouter);
app.use('/profile', userRouter);

app.listen(PORT, () => console.log('Server is listening on PORT', PORT))
