import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WallComponent } from '../wall/wall.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PublicationsComponent } from '../publications/publications.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,WallComponent,PublicationsComponent,FooterComponent,RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
