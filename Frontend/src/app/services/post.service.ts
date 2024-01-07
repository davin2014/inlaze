import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.url_api}/post`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.url_api}/post/posts`);
  }
}
