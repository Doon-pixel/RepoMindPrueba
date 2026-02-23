import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from '../../servicios/peticiones.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-activar',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './activar.component.html',
  styleUrl: './activar.component.css'
})
export class ActivarComponent implements OnInit {

  ngOnInit(): void {
    this.email = this.activateRoute.snapshot.params['email']
    this.codigo = this.activateRoute.snapshot.params['codigo']
  }

  constructor(private activateRoute : ActivatedRoute, private peticion: PeticionesService, private route: Router){}

email:string=''
codigo:string=''  

Activar(){
  var post ={
    host:this.peticion.HostLocal,
    path:'/api/usuarios/Activar',
    payload:{
      email:this.email,
      codigo:this.codigo
    }
  }

  this.peticion.Post(post.host+post.path,post.payload).then((respuesta:any)=>{
    if(respuesta.state == false){
      Notiflix.Notify.failure(respuesta.mensaje)
    }else{
      Notiflix.Notify.success(respuesta.mensaje)
      this.route.navigate(['/login/'+ this.email])
    }
  })
}





}
