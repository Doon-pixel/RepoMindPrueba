import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements AfterViewInit {

  
ngAfterViewInit(): void {
    (window as any).calendar?.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hQP_9HFFWKHwG_IMqaZ1g6dHz2rBnlhaYezbosFde6mrAd0Ww0ixQJayqBJ-ysWNoMPq5EIZ2?gv=true',
      color: '#598b7d',
      label: 'Agendar cita',
      target: document.querySelector('.calendar')
    });
  }
}



