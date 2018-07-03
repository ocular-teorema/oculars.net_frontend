import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginSubmit(loginForm: NgForm) {
    console.log('====================================');
    console.log(loginForm.value);
    console.log('====================================');
  }

  registerSubmit(registerForm: NgForm) {
    console.log('====================================');
    console.log(registerForm.value);
    console.log('====================================');
  }

}
