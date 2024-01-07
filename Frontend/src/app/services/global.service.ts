import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TokenUser } from '../interfaces/token-user.inteface';
import { Post } from '../interfaces/post.interface';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private authenticated = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticated.asObservable();

  private user = new BehaviorSubject<TokenUser>({
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
  });
  user$ = this.user.asObservable();

  private posts = new BehaviorSubject<Post[]>([]);
  posts$ = this.posts.asObservable();
  

  constructor(private postService: PostService) { }

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

  setUser(user: TokenUser) {
    this.user.next(user);
  }

  checkUserStatus() {
    if (typeof localStorage !== 'undefined') {
      const userItem = localStorage.getItem('user');
      if (userItem) {
        this.setUser(JSON.parse(userItem));
      } else {
        this.setUser({
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
        });
      }
    }
  }

  setPosts(posts: Post[]) {
    this.posts.next(posts);
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts:Post[]) => {
      this.setPosts(posts);
    });
    
  }


}
