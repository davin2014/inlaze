import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { GlobalService } from '../services/global.service';
import { TokenUser } from '../interfaces/token-user.inteface';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CreateAccountDialogComponent],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  loginForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, 
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private globalService: GlobalService) {
    this.buildForm();
   }

   onSubmit(event: Event) {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.loginService.login(value.email, value.password)
        .subscribe((res:TokenUser) => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res) );
          this.globalService.setUser(res);
          localStorage.setItem('authenticated', 'true' );
          this.globalService.setAuthenticated(true);
          this._snackBar.open('¡Bienvenido de nuevo a INLAZE! Estamos encantados de verte', 'Dance');
          this.dialogRef.close();
        }, (err) => {
          console.log(err);
          this.globalService.setAuthenticated(false);
          this._snackBar.open('¡Oh no! Algo ha ido mal. Por favor, inténtalo de nuevo', 'Cry');
        });
    }
   }

   buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }  

   // convenience getter for easy access to form fields
  get f() : { [key: string]: AbstractControl } { return this.loginForm.controls; }

  openCreateAccountDialog(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
    this.dialog.open(CreateAccountDialogComponent, {
      width: '500px'
    });
  }
}
