const path = require('path');
const fs = require('fs');

const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const cors = require('cors');

var employeeController = require('./controllers/employee.js');

dotenv.config();

mongoose.connect(
`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.n1dim.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`, (err) => {
    if (!err) {
        console.log('===== Connected!! =====');
    } else {
        console.log('===== Error!! =====' + JSON.stringify(err, undefined, 2));
    }
});

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );

app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(process.env.PORT || 3000, () => console.log('Server started at port : 3000'));

app.use('/employees', employeeController);