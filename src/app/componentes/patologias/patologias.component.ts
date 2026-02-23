import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-patologias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './patologias.component.html',
  styleUrl: './patologias.component.css'
})
export class PatologiasComponent {

}
