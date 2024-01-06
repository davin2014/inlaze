import { Component,OnInit,signal } from '@angular/core';
import { PublicationsCardComponent } from '../publications-card/publications-card.component';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [PublicationsCardComponent,FormsModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent  implements OnInit {
  authenticated = signal(false); 
  searchTerm: string = '';
   posts = [
    {
       _id: 'gbtttbbtttttt',
       tittle: 'Post 1', 
       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis ultricies ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nisl eget nisl. Sed euismod, nisl quis ultricies ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nisl eget nisl. Sed euismod, nisl quis ultricies ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nisl eget nisl. Sed euismod, nisl quis ultricies ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nisl eget nisl. Sed euismod, nisl quis ultricies ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nisl eget nisl. Sed euismod, nisl quis ultricies ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nisl eget nisl.' 
    },
    {
      _id: 'gbgggggggg',
      tittle: 'Post 2', 
      content: 'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' 
   },
   ];

  constructor(private globalService: GlobalService) {
    this.globalService.checkAuthenticationStatus();
   }
   searchPosts() {
    return this.posts.filter(post => post.tittle.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  editPost(post:any) {
    // Implement your edit functionality here
  }
  
  deletePost(post:any) {
    this.posts = this.posts.filter(p => p !== post);
  }

  createPost() {
    
  }
  
  ngOnInit() {
    this.globalService.authenticated$.subscribe((value:boolean) => {
        this.authenticated.set(value);
    });
  }
}
