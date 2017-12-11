import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import { RequestExceptionHandler } from '../../../error/request-exception-handler';

import { State } from '../../../model/state';
import {RegisterRequest} from '../../../model/register-request';
import {ValidatorsService} from '../../../service/validators.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any;

  loading = false;

  error = [];

  states = State;

  stateKeys(): Array<string> {
    const keys = Object.keys(this.states);
    return keys.slice(keys.length / 2);
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private validator: ValidatorsService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [
        Validators.required,
        this.validator.emailValidator()
        ],
        this.validator.createUniqueNameValidator(this.userService)
      ],
      phoneNumber: ['', [
        Validators.required,
        this.validator.phoneNumberValidator()
      ]],
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      password: ['', [
        Validators.required,
        this.validator.passwordValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.validator.matchingFields('password', 'confirmPassword') });
  }

  onSubmit() {
    this.auth.register(this.form.value as RegisterRequest).subscribe(
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

  getCurrentPasswordStrength(error) {
    if (error && error.passwordInvalid) {
      const len = error.passwordInvalid.length;
      return 'strength-meter-fill-' + len;
    }
    return error ? '' : 'strength-meter-fill-0';
  }

  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get email() { return this.form.get('email'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get addressLine1() { return this.form.get('address').get('addressLine1'); }
  get addressLine2() { return this.form.get('address').get('addressLine2'); }
  get city() { return this.form.get('address').get('city'); }
  get state() { return this.form.get('address').get('state'); }
  get zipCode() { return this.form.get('address').get('zipCode'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

}
