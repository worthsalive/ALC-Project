module.exports = function(app, db) {
  app.get('/',(req,res) =>{
    console.log('redirected to public index'+ __dirname + '/index.html');
    res.sendFile(__dirname + '/index.html')
  });

//HANDLE GET REQUEST TO ADD NEW Student
app.get('/public/add_student',function(req,res){
  res.render('add_student');
})

//HANDLE GET REQUEST FOR VIEW STUDNET
app.get('/public/view_student',function(req,res){
  db.connection.query('SELECT id,surname as Surname,other_names as Other_Names, email as Email, address as Address,phone as Phone,department as Department,date_format(dob,"%d/%m/%Y") as Date_of_Birth,date_format(regdate,"%d/%m/%Y") as Date_Registered, gender as Gender,mstatus as Marital_Status, username as Username,password as Password FROM  student ORDER BY surname ASC',(err,result,fields) => {
    if(err){
      console.log('Error selecting Student: ' + err);
      res.render('student_not_found',{msg:'Internal server error \n'+err});
    }else{
      res.render('view_student',{data:result,dl:result.length,field:fields,fl:fields.length});
    }
  });
});

//HANDLE GET REQUEST FOR SHOWING UPDATE LIST
app.get('/public/show_update',function(req,res){
  db.connection.query('SELECT id,surname,other_names,email,phone,gender,department FROM student ORDER BY surname',(err, result, fields) => {
    if(err){
      console.log('Error unable to show list \n'+err);
    }else{
      data = result;
      res.render('show_update_list',{data:data,dl:data.length});
    }
  })
});

//HANDLE GET REQUEST FOR SHOWING DELETE list
app.get('/public/show_delete',function(req,res){
  db.connection.query('SELECT id,surname,other_names,email,phone,gender,department FROM student ORDER BY surname',(err, result, fields) => {
    if(err){
      console.log('Error unable to show Delete list \n'+err);
    }else{
      data = result;
      res.render('show_delete_list',{data:data,dl:data.length});
    }
  })
})


//HANDLE GET UPDATE REQUEST FOR FETCHING A STUDENT RESOURCE TO BE UPDATED
app.get('/public/update',function(req,res){
  var sql= "SELECT surname,other_names, email, address,phone,department,date_format(dob,'%Y-%m-%d') as dob, gender,mstatus, username,password FROM student WHERE id = '"+req.query.sid+"'";
  //execute the query
  db.connection.query(sql,function(err,result,fields){
    if(err){
      console.log('something happened '+ err)
    }else{
      data = result;
      console.log(result)
      //check if data is found
      if(result != ''){
        //if  data found, renderupdate_student template otherwise, render student not found template
        res.render('update_student',{id:req.query.id,data:data});
      }else res.render('student_not_found',{msg:'The requested student record was not found in the db'});
    }
  });
});//end get update request

//HANDLE POST REQUEST  FOR  CREATING STUDENT RESOURCE
app.post('/create', (req, res) => {
  // log out the body
  console.log(req.body)
  var post=req.body;
  var queryStr = "INSERT INTO student VALUES(" +
  "null,'"+post.sname+"','"+post.oname+"','"+post.email+"'"+
  ",'"+post.address+"','"+post.phone+"','"+post.department+"'"+
  ",'"+post.dob+"','"+post.gender+"','"+post.mstatus+"','"+post.uname+"','"+post.password+"',now()"+
  ")";

  db.connection.query(queryStr,function(err,rows,fields){
    if(err){
      res.send('error occured <br>'+ post.gender + err);
    }else{
      res.send('Registration successfull');
      console.log('Student registration success');
    }
  });

});

//HANDLE POST  REQUEST FOR UPDATING STUDENT RESOURCE
app.post('/update',function(req,res){
  var post = req.body;//get the urlencoded data from the form
  var sql="UPDATE student SET "+
  "surname ='"+post.surname+"',other_names='"+post.onames+"',email='"+post.email+"',"+
  "address='"+post.address+"',phone='"+post.phone+"',department='"+post.department+"',"+
  "dob='"+post.dob+"',gender='"+post.gender+"',mstatus='"+post.mstatus+"',"+
  "username='"+post.uname+"',password='"+post.password+"' "+
  "WHERE id='"+post.id+"'";
//execute the sql
db.connection.query(sql,function(err,result){
  if(err){
    console.log('Error occured while updating \n'+ err);

  }else{
    console.log('update successfull');

    res.send('Record Updated successfully');
  }
})
});

//HANDLE DELETE REQUEST FOR DELETE student resource
app.delete('/crud',function(req,res){
  var sql="DELETE FROM student WHERE id = '"+req.body.id+"'"
  //execute the query
  db.connection.query(sql,(err,result) =>{
    if(err){
      console.log(err);
    }else{
      res.send('Record deleted successfully');
    }
  });
});
};//end module exports
