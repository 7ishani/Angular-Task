import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { first} from "rxjs/operators";
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router} from "@angular/router";
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:User;
  editForm: FormGroup;
  id:number;
  userSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private alertify: AlertifyService) {
                this.id = this.route.snapshot.params.id;
              }

  ngOnInit(): void {
    this.createEditForm();
    this.getUserById();

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['',Validators.required],
      avatar: ['', Validators.required]
    });
  }

  createEditForm(){
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  getUserById(){
    this.apiService.getUserById(this.id)
      .subscribe( data => {
        console.log(data);
        this.editForm.setValue(data.data);
      },error =>{
        console.log("error");
        console.log(error);
      });
  }

  onSubmit(){
    this.userSubmitted = true;

    if(this.editForm.valid){
      this.apiService.updateUser(this.editForm.value, this.id)
      .pipe(first())
      .subscribe(
        data => {
            this.alertify.success('User updated successfully');
            this.router.navigate(['listuser']);
        },
        error => {
            this.alertify.error('Something went wrong');
        });
    }
    else{
      this.alertify.error('Please fill the required fields');
    }
  }
}
