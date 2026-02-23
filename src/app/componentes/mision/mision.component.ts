import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-mision',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './mision.component.html',
  styleUrl: './mision.component.css'
})
export class MisionComponent {

}
