import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { User } from './../../interfaces/user.interface';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
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
  authenticated = signal(false);  

  constructor(public dialog: MatDialog,
    private globalService: GlobalService) { 
    if (typeof localStorage !== 'undefined') {
      const userItem = localStorage.getItem('user');
      this.user = userItem ? JSON.parse(userItem) : null;
    }
    this.globalService.checkAuthenticationStatus();
  }
  login() {
    this.dialog.open(LoginDialogComponent);
  }
  
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    
  }

  ngOnInit() {
    this.globalService.authenticated$.subscribe((value:boolean) => {
        this.authenticated.set(value);
    });
  }
}
