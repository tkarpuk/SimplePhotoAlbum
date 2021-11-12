import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {
  token_key: string = 'auth-token';
  baseUrl: string = 'https://localhost:44337/api/';
  pageLimit: number = 10;


  constructor() { }
}
