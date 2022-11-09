require('dotenv').config();
const express = require('express');
const cors = require('cors');

const petRouter = require('./routes/pet');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json())

app.use('/pet', petRouter);

app.listen(PORT, () => console.log('Server is listening on PORT', PORT))
