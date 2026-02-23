import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css'
})
export class VisionComponent {

}













// export class ServiciosComponent implements OnInit {

//   datosServicios:any []= []

//   constructor(private peticion: PeticionesService){
//   }

//   ngOnInit(): void {
//   this.ListarTodosServicios()
//   }

//   ListarTodosServicios(){
//   var post ={
//         host:this.peticion.HostLocal,
//         path:'/api/servicios/ListarTodos',
//         payload:{
          
//         }
//       }
//       this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
//         this.datosServicios = respuesta
        
//       })

// }


// }


// ngAfterViewInit(): void {
//     (window as any).calendar?.schedulingButton.load({
//       url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hQP_9HFFWKHwG_IMqaZ1g6dHz2rBnlhaYezbosFde6mrAd0Ww0ixQJayqBJ-ysWNoMPq5EIZ2?gv=true',
//       color: '#598b7d',
//       label: 'Agendar cita',
//       target: document.querySelector('.calendar')
//     });
//   }