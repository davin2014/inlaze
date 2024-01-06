import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>) {
      this.formBuilder();
   }
   formBuilder() {
    this.form = this.fb.group({
    fullName: ['', Validators.required],
    age: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    posts: [[]]
  }, { validator: this.checkPasswords });
}
onSubmit(event: Event) {
  console.log(this.form.value);
  if (this.form.valid) {
    const value = this.form.value;
    delete value.confirmPassword;
    this.userService.createUser(value).subscribe((user) => {
      console.log(user);
      
      this._snackBar.open('Usuario creado exitosamente', 'Dance');
      this.dialogRef.close();
    }, (err) => {
      console.log(err);
      this._snackBar.open('¡Oh no! Algo ha ido mal. Por favor, inténtalo de nuevo', 'Cry');
    });
  }
 }

 checkPasswords(group: FormGroup) {
  let passControl = group.get('password');
  let confirmPassControl = group.get('confirmPassword');

  if (passControl && confirmPassControl) {
    let pass = passControl.value;
    let confirmPass = confirmPassControl.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  return null;
}
}
