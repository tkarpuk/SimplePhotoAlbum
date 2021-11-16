import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';

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
     this.http.post(`${this.baseUrl}Auth`, {}, { params: {email, password}})
     .subscribe(
       (data:any) => {
       localStorage.setItem(this.token_key, data.Token);
      },
      err => {
        console.log(err);
        alert('WARNING: Unsucsessful authentification \n'+ err.message);
      }
      );
  }

  public logout() {
    localStorage.removeItem(this.token_key);
  }

  public isLogIn(): boolean {
    return this.getToken() !== '';
  }

  public getToken(): string {
    let token = localStorage.getItem(this.token_key);
    if (!token)
      token = '';

    return  token;
  }

  public TryTest() {
    // TODO: remove after testing
    return this.http.get(this.baseUrl + 'Test', {responseType: 'text'});
  }
}
