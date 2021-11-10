import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {
  token_key: string = 'auth-token';
  baseUrl: string = 'http:\\unknown.com';
  pageLimit: number = 10;


  constructor() { }
}
