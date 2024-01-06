import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { TokenUser } from '../interfaces/token-user.inteface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<TokenUser> {
    const body = { email: email, password: password };
    return this.http.post<TokenUser>(`${environment.url_api}/auth/login`, body);
  }
}
