import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: any;
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // reset login status
    // this.auth.logout();
    this.auth.refresh().toPromise().then(() => {
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err);
      this.auth.logout();
    });

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(
          '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@' +
          '((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
        )
      ])],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.loading = true;
    this.auth.login(this.form.value.username, this.form.value.password)
      .subscribe(result => {
        // login successful
        this.router.navigate(['/']);
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  showError(formControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
