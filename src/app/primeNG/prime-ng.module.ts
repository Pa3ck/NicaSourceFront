import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { SigninComponent } from '../components/signin/signin.component';
import { HomeComponent } from '../components/home/home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    InputTextModule,
    ButtonModule
  ]
})
export class PrimeNGModule { }
