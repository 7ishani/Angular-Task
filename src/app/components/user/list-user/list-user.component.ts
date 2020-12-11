import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private router:Router,
              private apiService: ApiService) { }

  users: any;
  pages: any;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.apiService.getUser().subscribe(
      data => {
        this.users = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }

  addUser(){
    this.router.navigate(['adduser']);
  }

  deleteUser(user: User): void{
    this.apiService.deleteUser(user.id);
  }

  editUser(user: User): void{
    this.router.navigate(['edituser/'+user.id]);
  }
}
