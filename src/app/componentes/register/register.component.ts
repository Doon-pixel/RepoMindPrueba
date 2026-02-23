import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../../servicios/peticiones.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

constructor(private peticion : PeticionesService){}

nombre:string=''
email:string=''
password:string=''

registrar(){
  var post ={
    host:this.peticion.HostLocal,
    path:'/api/usuarios/Registrar',
    payload:{
      nombre:this.nombre,
      email:this.email,
      password:this.password
    }
  }

  this.peticion.Post(post.host+post.path,post.payload).then((respuesta:any)=>{ 
    console.log(respuesta)
   })
}


}

