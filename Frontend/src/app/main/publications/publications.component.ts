import { Component,OnInit,signal } from '@angular/core';
import { PublicationsCardComponent } from '../publications-card/publications-card.component';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { User } from '../../interfaces/user.interface';
import { TokenUser } from '../../interfaces/token-user.inteface';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../create-post/create-post.component';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [PublicationsCardComponent,FormsModule,CreatePostComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent  implements OnInit {
  authenticated = signal(false); 
  fullName = signal('anonimo');
  searchTerm: string = '';
   posts:Post[] = [];

  constructor(private globalService: GlobalService,
    private dialog: MatDialog,
    private postService: PostService) {
    this.globalService.checkAuthenticationStatus();
    this.globalService.checkUserStatus();
    this.getPosts();
   }
   searchPosts() {
    return this.posts.filter((post:Post) => post.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  editPost(post:any) {
    // Implement your edit functionality here
  }
  
  deletePost(post:any) {
    this.posts = this.posts.filter(p => p !== post);
  }

  createPost() {
    this.dialog.open(CreatePostComponent, {
      width: '600px',
      height: '500px',
      data: {
        title: 'Create Post',
        post: {}
      }
    });
  }

  ngOnInit() {
    this.globalService.authenticated$.subscribe((value:boolean) => {
        this.authenticated.set(value);
    });

    this.globalService.user$.subscribe((value:TokenUser) => { 
      this.fullName.set(value.user.fullName);
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts:Post[]) => {
      this.posts = posts;
    });
  }
}
