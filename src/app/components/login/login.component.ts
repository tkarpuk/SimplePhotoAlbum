import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  testTime: string = 'test is BAD!'; // TODO: remove after testing

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();

    this.tryTest();
  }

  tryTest(): void { // TODO: remove after testing
    this.authService.TryTest().subscribe(data => {this.testTime = data;});
  }

  createLoginForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  onLogin() {
    const email = this.formLogin.value['email'];
    const password = this.formLogin.value['password'];

    this.authService.login(email, password);
//    this.formLogin.reset();
    this.router.navigateByUrl('/album');
  }
}
