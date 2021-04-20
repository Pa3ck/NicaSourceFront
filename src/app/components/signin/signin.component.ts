import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MessageService]
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;


  constructor(
    private autService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  signIn() {
    const user = this.signinForm.value;
    this.autService.signIn(user.email, user.password)
    .subscribe((resp: any) => {
      if (resp.ok) {
        console.log('sign in exitoso');
        this.autService.storeUserToken(resp.token);
        this.router.navigate(['/home']);
      }
    }, (err) => {
      console.log(err);
      this.messageService.add({severity:'error', summary: 'Login Error', detail: err.error.message });
    });
  }



}
