import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

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
    private userService: UserService) {
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
