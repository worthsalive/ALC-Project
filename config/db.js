const mysql = require('mysql');
const database = 'stud_res';

//connect to the database
const connection = mysql.createConnection({
///  connectionLimit:10,
   //host     : 'wwww.000webhost.com',
  // user     : 'id3405861_alc',
  // password : 'alc',
   host: 'db4free.net',
   user : 'alc123',
   password : 'alc123',
  database : database
 });

//remote mysql connection




 //set up the table creation functions(database schema)
 var createStudentTable = function(tbl_name){
   var str = "Create table if not exists "+tbl_name+"( "+
     "id int(5) auto_increment primary key,"+
     "surname varchar(15) not null,"+
     "other_names varchar(15) not null,"+
     "email varchar(90) not null,"+
     "address varchar(100) not null,"+
     "phone varchar(15) not null,"+
     "department varchar(50) not null,"+
     "dob date not null,"+
     "gender varchar(8) not null,"+
     "mstatus varchar(12) not null,"+
     "username varchar(10) not null,"+
     "password text not null,"+
     "regdate datetime"
   +")";

   connection.query(str,function(errs,rows,fields){
     if(errs){
       console.log('error creating table '+errs)
     }else{
       console.log('table "'+tbl_name+'" created');
     }
   });
 }

 //EXPORT MODULES
module.exports = {
  ///url :'mongodb://alc:alc@ds231245.mlab.com:31245/notes'
 connection: connection,
 //remoteConnection:client,
createTable: createStudentTable
};
