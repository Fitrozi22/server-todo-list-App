const express = require('express');
const port = process.env.PORT || 7000;
const cors = require('cors');
const morgan = require('morgan');
// const errorHandler = require('./middleware/error');
const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

