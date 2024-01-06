import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private authenticated = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticated.asObservable();

  setAuthenticated(value: boolean) {
    this.authenticated.next(value);
  }

  checkAuthenticationStatus() {
    if (typeof localStorage !== 'undefined') {
      const authenticatedItem = localStorage.getItem('authenticated');
      if (authenticatedItem === 'true') {
        this.setAuthenticated(true);
      } else {
        this.setAuthenticated(false);
      }
    }
  }
}
