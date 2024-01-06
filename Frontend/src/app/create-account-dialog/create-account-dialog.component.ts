import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
      this.formBuilder();
   }
   formBuilder() {
    this.form = this.fb.group({
    fullName: ['', Validators.required],
    age: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    posts: [[]]
  });
}
onSubmit(event: Event) {
  console.log(this.form.value);
  if (this.form.valid) {
    const value = this.form.value;
    
  }
 }

}
