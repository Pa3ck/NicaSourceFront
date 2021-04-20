import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const user = this.loginForm.value;
    this.authService.login(user.email, user.password)
    .subscribe((resp: any) => {
      if (resp.ok) {
        console.log('log in exitoso');
        this.authService.storeUserToken(resp.token);
        this.router.navigate(['/home']);
      }
    }, (err) => {
      this.messageService.add({severity: 'error', summary: 'Login Error', detail: err.error.message });
    });
  }

}
