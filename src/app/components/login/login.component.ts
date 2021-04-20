import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['test@mail.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]]
    });
  }

  login() {
    const user = this.loginForm.value;
    this.authService.login(user.email, user.password)
    .subscribe((resp: any) => {
      if (resp.ok) {
        console.log('sign in exitoso');
        this.authService.storeUserToken(resp.token);
        this.router.navigate(['/home']);
      }
    }, (err) => {
      console.log(err.message);
    });
  }

}
