import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "https://temp-app-aeromus.herokuapp.com";

  // baseUrl = "http://localhost:3000";
  
  // sendMailUrl = "https://temp-app-aeromus.herokuapp.com/sendmail";

  constructor(private http: HttpClient) { }

  //get all data observe
  getAllQuestion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/questions`);
  }

  //Add Question
  addQuestion(data: any): Observable<any> {
    console.log(data, 'Data Created')
    return this.http.post(`${this.baseUrl}/question`, data);
  }

  //Delete Question
  deleteQuestion(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.baseUrl}/question/${ids}`)
  }

  //Update Question

  updateQuestion(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.baseUrl}/question/${ids}`, data)
  }

  //get Single Question

  getSingleQuestion(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.baseUrl}/question/${ids}`);
  }

  // User API

  //get all user data observe

  getLogin(email:any,password:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/`+email+`/`+password);
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  //Add User
  createUser(data: any): Observable<any> {
    console.log(data, 'Data Created')
    return this.http.post(`${this.baseUrl}/user`, data);
  }

  //Delete User
  deleteUser(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.baseUrl}/user/${ids}`)
  }

  //Update User

  updateUser(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.baseUrl}/user/${ids}`, data)
  }

  //get Single User

  getSingleUser(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.baseUrl}/user/${ids}`);

  }

  // sendMail(): Observable<any> {
  //   return this.http.post(`${this.sendMailUrl}`, 'data');
  // }
}