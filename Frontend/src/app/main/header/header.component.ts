import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { User } from './../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: User = {
    age: 0,
    createdAt: "",
    email: "",
    fullName: "anonimo",
    posts: [],
    updatedAt: "",
    __v : 0,
    _id: ""
  };
  authenticated: boolean = false; 

  constructor(public dialog: MatDialog) { 
    if (typeof localStorage !== 'undefined') {
      const userItem = localStorage.getItem('user');
      this.user = userItem ? JSON.parse(userItem) : null;
    }
    if (typeof localStorage !== 'undefined') {
      const authenticatedItem = localStorage.getItem('authenticated');
      this.authenticated = authenticatedItem ? JSON.parse(authenticatedItem) : false;
    }
  }
  login() {
    this.dialog.open(LoginDialogComponent);
  }
  
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    this.authenticated = false;
  }
}
