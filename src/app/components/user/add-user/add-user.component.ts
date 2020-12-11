import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router} from "@angular/router";
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  get id(){
    return this.addForm.get('id') as FormControl;
  }

  get email(){
    return this.addForm.get('email') as FormControl;
  }

  get first_name(){
    return this.addForm.get('first_name') as FormControl;
  }

  get last_name(){
    return this.addForm.get('last_name') as FormControl;
  }

  get avatar(){
    return this.addForm.get('avatar') as FormControl;
  }

  onSubmit(){
    this.userSubmitted = true;

    if(this.addForm.valid){
      this.apiService.createUser(this.userData());
      this.addForm.reset();
      this.alertify.success('You have successfully created a new user!')
      this.router.navigate(['listuser']);
    }
    else{
      this.alertify.error('Please fill the required fields');
    }
  }

  userData(): User{
    return this.user = {
      id: this.id.value,
      email: this.email.value,
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      avatar: this.last_name.value
    }
  }
}
