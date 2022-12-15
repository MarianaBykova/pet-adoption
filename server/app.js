require('dotenv').config();
const express = require('express');
const cors = require('cors');

const petRouter = require('./routes/pet');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/pet', petRouter);
app.use('/auth', authRouter);
app.use('/profile', userRouter);

app.listen(PORT, () => console.log('Server is listening on PORT', PORT))
