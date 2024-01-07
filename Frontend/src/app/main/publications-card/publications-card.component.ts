import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-publications-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './publications-card.component.html',
  styleUrl: './publications-card.component.css'
})
export class PublicationsCardComponent {
   @Input() id: string = '';
   @Input() FullName: string = '';
   @Input() tittle: string = '';
   @Input() content: string = '';
   @Input() CreatedAt: string = '';
  


   constructor(private postService: PostService,
    private globalService: GlobalService) { }


   deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      // Aquí puedes manejar la respuesta, por ejemplo, eliminando el post de una lista de posts.
      this.setPosts();
    });
  }

  setPosts() {
    this.postService.getPosts().subscribe(posts => {
    this.globalService.setPosts(posts);
    });
  }
   
}
