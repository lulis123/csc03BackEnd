const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoosePatchUpdate = require('mongoose-patch-update');
const eventController = require('./controllers/eventController');
const storeController = require('./controllers/storeController')
const shell = require('shelljs');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
//Setting up mongodb
shell.exec('./runMongoDB.sh');

//Setting-up Mongoose
mongoose.plugin(mongoosePatchUpdate);
mongoose.Promise = global.Promise;

//Connecting to mongoose
mongoose.connect("mongodb://localhost:27016",{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then( connection => {
   console.log('Successfully connected to Mongodb')
}).catch( err => {
   console.log('error connecting to MongoDB');
   console.log(err);
   process.exit();
});

//Setting up morgan
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/store',storeController);
app.use('/event',eventController);


app.listen(5000);
