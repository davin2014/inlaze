import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../interfaces/post.interface';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  

  constructor(private fb: FormBuilder, 
    private postService: PostService,
    private globalService: GlobalService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreatePostComponent>) {
    this.globalService.user$.subscribe(user => {
      if (user) {
        this.postForm.patchValue({ userId: user.user._id });
      }
      });
     }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      likes: [''],
      userId: ['']
      
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.postService.createPost(post).subscribe(response => {
        this._snackBar.open('Post creado exitosamente', 'Dance');
        this.dialogRef.close();
        this.setPosts();
      }, (err) => {
        console.log(err);
        this._snackBar.open('¡Oh no! Algo ha ido mal. Por favor, inténtalo de nuevo', 'Cry');
      });
    }
  }

  setPosts() {
    this.postService.getPosts().subscribe(posts => {
    this.globalService.setPosts(posts);
    });
  }
}
