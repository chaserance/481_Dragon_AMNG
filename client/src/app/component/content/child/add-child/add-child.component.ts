import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import { RequestExceptionHandler } from '../../../error/request-exception-handler';

import { State } from '../../../model/state';
import {LoginRequest} from '../../../model/login-request';
import {ValidatorsService} from '../../../service/validators.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})

 export class AddChildComponent implements OnInit {

  form: any;
  loading = false;
  error = [];
  genders = Gender;

    constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private validator: ValidatorsService,
    private userService: UserService
  ) { }
//
  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required]

    },);
   }

  onSubmit() {
    this.auth.child(this.form.value as LoginRequest).subscribe(
      (response: Response) => {
        if (response.status === 201) {
          this.router.navigate(['/login']);
        } else {
          this.error = response.json().message();
        }
      },
      error => {
        // Bad request
        if (error.status === 400 && !!!error.json().errorCode) {
          const errorArray = RequestExceptionHandler.getBadRequestMessages(error.json().errors);
          this.error = errorArray;
        } else {
          this.error = [];
          this.error.push(error.json().message);
        }
      }
    );
  }

  showError(formControl): boolean {
   return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  closeAlert(): void {
   this.error = [];
  }



  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get gender() { return this.form.get('gender'); }


}
