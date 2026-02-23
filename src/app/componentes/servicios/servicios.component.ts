import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PeticionesService } from '../../servicios/peticiones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {

datosServicios:any []= []

  constructor(private peticion: PeticionesService){
  }

  ngAfterViewInit(): void {
    (window as any).calendar?.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hQP_9HFFWKHwG_IMqaZ1g6dHz2rBnlhaYezbosFde6mrAd0Ww0ixQJayqBJ-ysWNoMPq5EIZ2?gv=true',
      color: '#000000',
      label: 'Agendar cita',
      target: document.querySelector('.calendar')
    });
  }

  ngOnInit(): void {
  this.ListarTodosServicios()
  }

  ListarTodosServicios(){
  var post ={
        host:this.peticion.HostLocal,
        path:'/api/servicios/ListarTodos',
        payload:{
          
        }
      }
      this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
        this.datosServicios = respuesta
        
      })

}


}





