import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]) // TODO: minlength from settins
    });
  }

  onLogin() {
    const email = this.formLogin.value['email'];
    const password = this.formLogin.value['password'];

    // TODO: implements Auth service
    //console.log(email, password);

    this.formLogin.reset();
  }
}
