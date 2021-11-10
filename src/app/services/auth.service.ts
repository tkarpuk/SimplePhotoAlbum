import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigureService } from './configure.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl: string = '';
  token_key: string = '';

  constructor(private http: HttpClient,
    private config: ConfigureService)
  {
    this.baseUrl = this.config.baseUrl;
    this.token_key = this.config.token_key;
  }

  public login(email: string, password: string): void {
     this.http.post(`${this.baseUrl}/login`, {email, password})
     .subscribe(
       (data:any) => {
       localStorage.setItem(this.token_key, data.token)
      },
      err => {
        console.log(err);
        alert('Unsucsessful authentification \n'+ err.message);
      }
      );
  }

  public logout() {
    localStorage.removeItem(this.token_key);
  }

  public isLogIn(): boolean {
    return (localStorage.getItem(this.token_key) !== null);
  }
}
