import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  listUsers : any;
  sign :any= false;
  forget:any =false;
  getparamid:any;
  data:any;
  userprofile:any=[];
  succesMsg: any;
  errMsg: any;
  userForm = new FormGroup({
    'userid': new FormControl('',Validators.required),
    'email': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required),
    'cpassword': new FormControl('',Validators.required),
  });
  // public loginForm!: FormGroup;
  allUser: any =  [
    {"id": 1,"userid": "Gyan Prakash", "email": "aeromusgyan@gmail.com","password": "1234","status": "active", "quizmarks": 20,rank: '1st'
    },
    {
    "id": 16,"userid": "Akshat Maurya", "email": "aaravsingh1362@gmail.com","password": "123456","status": "active","quizmarks": 18,rank: '2nd'
    },
    {
    "id": 15,"userid": "Admin", "email": "admin@minigans.com","password": "admin", "status": "active","quizmarks": 16,rank: '3rd'
    },
    {
    "id": 14,"userid": "Anand Verma", "email": "vermaanand278@gmail.com", "password": "123456", "status": "active","quizmarks": 0,rank: ''
    },
    {
    "id": 13, "userid": "Nitish","email": "nitish@gmail.com", "password": "123","status": "active","quizmarks": 0,rank: ''
    },
    {
    "id": 17, "userid": "Anshi Mitra","email": "minigans22@gmail.com","password": "1234", "status": "active","quizmarks": 0,rank: ''
    }];

  profile = [
    {userid: "GYAN PRAKASH",email: "admin@minigans.com",password: "admin", quizmarks: '18',rank: '2nd'
  }];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor(private router:Router, private admin:ApiService, private http:HttpClient) {
    this.data = localStorage.getItem("userdata");
    if(this.data!=null){
      this.userprofile = JSON.parse(this.data);
      //alert(JSON.stringify(this.userprofile));
    }
   }

   loginForm = new FormGroup({
    'email': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required)
  });
  ngOnInit(): void {
  }

  login(){
    this.forget=false;
    this.admin.getLogin(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      Response=>{
        this.userprofile=Response;
        localStorage.setItem("userdata",JSON.stringify(this.userprofile));
        if(this.loginForm.value.email =="admin@minigans.com" && this.loginForm.value.password == "admin"){
          window.location.href='/dashboard/email';
        }
        else{
          window.location.href='/quizes';
        }
        
      },
      error=>{
        alert("Userid or Password not match");
      }
    );
    
  }
  newuser(){
    this.sign = true;
    this.loginForm.reset();
  }
  signup(){
    if(this.userForm.valid && this.userForm.value.password == this.userForm.value.cpassword){
      // console.log(this.userForm.value);
      this.admin.createUser(this.userForm.value).subscribe((res)=>{
        console.log(res, 'User Created Succefully');
        this.userForm.reset();
        this.succesMsg = res.message;
        this.clear();
      })
    }
    if(this.userForm.invalid){
      this.errMsg ='All Fields Are Required';
    }
    else{
      this.errMsg ='Password not match ! Please Input the Correct Password';
    }
  }
  clear(){
    this.sign = false;
    this.forget = false;
    this.userForm.reset();
  }

  forgetpass(){

    this.forget =true;
    this.sign =false;
    this.userForm.reset();
  }

}
