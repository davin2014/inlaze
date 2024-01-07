import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../interfaces/post.interface';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenUser } from '../interfaces/token-user.inteface';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  user: TokenUser = {
    access_token: "",
    user: {
      age: 0,
      createdAt: "",
      email: "",
      fullName: "anonimo",
      posts: [],
      updatedAt: "",
      __v : 0,
      _id: ""
      }
  };

  constructor(private fb: FormBuilder, 
    private postService: PostService,
    private globalService: GlobalService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreatePostComponent>) {
    this.globalService.user$.subscribe((user:TokenUser) => {
      
      if (user) {
        console.log(user);
        this.user = user;
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
      let post: Post = this.postForm.value;
      post.userId = this.user.user._id;
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
