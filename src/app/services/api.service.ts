import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { User } from '../model/user';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient,
                private alertify: AlertifyService) { }

    baseUrl: string = 'https://reqres.in/api/users/';
    users:any;
    user: User;

    //get user details
    getUser(): Observable<any>{
        return this.http.get<any>(this.baseUrl+'?page='+1);
    }

    //get user details of a single user
    getUserById(id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl+id);
    }

    //create a new user
    createUser(user: User){
      console.log("user : "+user);
        return this.http.post<any>(this.baseUrl, user
            ).subscribe(res =>{
                console.log(res);
            },error => {
                console.log(error);
                this.alertify.error("Something went wrong!")
        });
    }

    //delete a user
    deleteUser(id: number){
        return this.http.delete<any>(this.baseUrl+id
            ).subscribe( data => {
                console.log(data);
                this.alertify.success('You have successfully deleted the user');
            },error => {
                console.log(error);
                this.alertify.error('Something went wrong!');
        })
    }

    //updating user details
    updateUser(user:User, id:number): Observable<any> {
        return this.http.put<any>(this.baseUrl+id, user);
  }
}
