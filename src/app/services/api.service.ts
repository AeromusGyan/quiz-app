import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost:3000/questions";
  addUrl = "http://localhost:3000/question";

  
  adminUrl = "http://localhost:3000/users";
  addAdminUrl = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  //get all data observe
  getAllQuestion(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  //Add Question
  addQuestion(data: any): Observable<any> {
    console.log(data, 'Data Created')
    return this.http.post(`${this.addUrl}`, data);
  }

  //Delete Question
  deleteQuestion(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.addUrl}/${ids}`)
  }

  //Update Question

  updateQuestion(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.addUrl}/${ids}`, data)
  }

  //get Single Question

  getSingleQuestion(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.addUrl}/${ids}`);
  }

  // User API

  //get all user data observe

  getLogin(email:any,password:any): Observable<any> {
    return this.http.get(`${this.adminUrl}/`+email+`/`+password);
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.adminUrl}`);
  }

  //Add User
  createUser(data: any): Observable<any> {
    console.log(data, 'Data Created')
    return this.http.post(`${this.addAdminUrl}`, data);
  }

  //Delete User
  deleteUser(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.addAdminUrl}/${ids}`)
  }

  //Update User

  updateUser(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.addAdminUrl}/${ids}`, data)
  }

  //get Single User

  getSingleUser(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.addAdminUrl}/${ids}`);

  }

}
