require("dotenv").config();   //for env

const express =  require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());

app.use(bodyparser.json());

//Connect mysql Database

const db = mysql.createConnection({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
    connectionLimit :10
});

app.listen(process.env.APP_PORT,()=>{
    console.log("Server is running on 3000 PORT, MINIGANS :", process.env.APP_PORT);
})

//check database connection
db.connect(err => {
    if(err){console.log('err')}
    console.log('Database Connected Succesful!!!')
})

//Get All DAta
app.get('/questions',(req,res)=>{
    // console.log('Get All Users');
    
    let qrr =`SELECT * FROM questions`;
    db.query(qrr,(err,results)=>{
        if(err){console.log(err,'errs');
    }
    if(results.length>0){
        res.send({
            message:'All Questions Data',
            data:results
        });
    };
    });
});

//Get Single Data by ID

app.get('/question/:id',(req,res)=>{
    // console.log(req.params.id); 
    let qrId=req.params.id;
    let qr =`SELECT * FROM questions where id =${qrId}`;

    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"Get Data By Id",
                data:results
            })
        }
        else{
            res.send({
                message:"Data not found!!"
            })
        }
    })
})

//Post Data

app.post('/question',(req,res)=>{
    // console.log(req.body,'Post Data Succes')
    let Question = req.body.question;
    let Option1 = req.body.option1;
    let Option2 = req.body.option2;
    let Option3 = req.body.option3;
    let Option4 = req.body.option4;
    let Answer = req.body.answer;
    let Department = req.body.department;

    let qr =`insert into questions(question,option1,option2,option3,option4,answer,department) value('${Question}','${Option1}','${Option2}','${Option3}','${Option4}','${Answer}','${Department}')`;
    
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Question Added Succesful..",
            data:results
        })
    })
})
//update data
app.put('/question',(req,res)=>{
    // console.log(req.body,"Updated Data")
    let uID =req.params.id;
    let Question = req.body.question;
    let Option1 = req.body.option1;
    let Option2 = req.body.option2;
    let Option3 = req.body.option3;
    let Option4 = req.body.option4;
    let Answer = req.body.answer;
    let Department = req.body.department;

    let qr=`update questions set question = '${Question}' , option1 = '${Option1}', option2 = '${Option2}' , option3 = '${Option3}', option4 = '${Option4}', answer = '${Answer}', department = '${Department}' where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err) {console.log(err) }
        res.send({
            message:"Data Updated Succesfull..",
            data:results
        })
    })
})
//delete Data
app.delete('/question/:id',(req,res)=>{
    let uID = req.params.id;
    let qr =`delete from questions where id = '${uID}' `;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data deleted Succesfull!!"
        })
    })
})


app.get('/users/:email/:password',(req,res)=>{
    let rEmail = req.params.email;
    let rPass = req.params.password;

    let qrr =`SELECT * FROM users where email='${rEmail}' and password='${rPass}'`;
    db.query(qrr,(err,results)=>{
        if(err){console.log(err,'errs');
    }
    if(results.length>0){
        res.send(results);
    };
    })
})
// users table
//Get All DAta
app.get('/users',(req,res)=>{
    // console.log('Get All Users');
    let qrr =`SELECT * FROM users`;
    db.query(qrr,(err,results)=>{
        if(err){console.log(err,'errs');
    }
    if(results.length>0){
        res.send({
            message:'All users Data',
            data:results
        });
    };
    });
});

//Get Single Data by ID

app.get('/user/:id',(req,res)=>{
    // console.log(req.params.id); 
    let qrId=req.params.id;
    let qr =`SELECT * FROM users where id =${qrId}`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"Get Data By Id",
                data:results
            })
        }
        else{
            res.send({
                message:"Data not found!!"
            })
        }
    })
})
//Post Data
app.post('/user',(req,res)=>{
    // console.log(req.body,'Post Data Succes')
    let Userid = req.body.userid;
    let Email = req.body.email;
    let Password = req.body.password;
    let Status = req.body.status;
    let qr =`insert into users(userid,email,password,status) value('${Userid}','${Email}','${Password}','active')`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"User Added Succesfully.",
            data:results
        })
    })

})
//update data
app.put('/user',(req,res)=>{
    // console.log(req.body,"Updated Data")
    let uID =req.params.id;
    let Userid = req.body.userid;
    let Email = req.body.email;
    let Password = req.body.password;
    let Status = req.body.status;

    let qr=`update users set userid = '${Userid}' , email = '${Email}', password = '${Password}' , status = '${Status}' where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err) {console.log(err) }
        res.send({
            message:"User Data Updated Succesfully.",
            // data:results
        })
    })
})

//update data
app.put('/user',(req,res)=>{
    // console.log(req.body,"Updated Data")
    let uID =req.params.id;
    let Quizmarks = req.body.quizmarks;

    let qr=`update users set quizmarks = '${Quizmarks}' where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err) {console.log(err) }
        res.send({
            message:"User Marks Updated Succesfully.",
            // data:results
        })
    })
})

//delete User Data
app.delete('/user/:id',(req,res)=>{
    let uID = req.params.id;
    let qr =`delete from users where id = '${uID}' `;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"User Data deleted Succesfully!!"
        })
    })
})
// users Table


