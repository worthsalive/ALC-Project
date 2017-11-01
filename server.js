//const MongoClient    = require('mongodb').mongoClient;
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = process.env.PORT || 8000;
const table = 'student';
//gain access to more of the req methods
app.use(bodyParser.urlencoded({ extended: true }));
//setupt static file
app.use('/public',express.static(__dirname + '/public'));
//app.use('/assets',express.static('public/assets'));
//setup template engine
app.set('view engine','ejs');

const db = require('./config/db');//connect to mysql using the client details
require('./controllers/routes')(app, db);

 //connect to t database
 db.connection.connect(function(err){
   if(err){
     console.log('Error connecting to database: '+err);

   }else{
     console.log('Connection to database successfull');
     db.createTable(table);
   }
 });
/*

*/
//var database='notes';
  //Connect to my database using the MongoClient
  //  MongoClient.connect(db.url, (err, database) => {
    //  if (err) return console.log(err)
      require('./controllers/routes')(app, db);

      app.listen(port, () => {
        console.log('server listening to port: ' + port);

      });

  //  });
