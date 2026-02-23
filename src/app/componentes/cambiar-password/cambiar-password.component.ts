import { Component } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../../servicios/peticiones.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [MenulateralComponent, FormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {

  constructor(private peticion: PeticionesService){}

  password:string=''
  confirmarPassword:string=''

  cambiarPassword(){

  var post ={
    host:this.peticion.HostLocal,
    path:'/api/usuarios/cambiarPassword',
    payload:{
      password:this.password,
      confirmarPassword:this.confirmarPassword
    }
  }

  this.peticion.Post(post.host+post.path,post.payload).then((respuesta:any)=>{
    if(respuesta.state == false){
      Notiflix.Notify.failure(respuesta.mensaje)
    }else{
      Notiflix.Notify.success(respuesta.mensaje)
    }

  }) 

}

}