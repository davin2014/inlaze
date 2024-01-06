import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-publications-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './publications-card.component.html',
  styleUrl: './publications-card.component.css'
})
export class PublicationsCardComponent {
   @Input() FullName: string = '';
   @Input() tittle: string = '';
   @Input() content: string = '';
   @Input() CreatedAt: string = '';

   
}
