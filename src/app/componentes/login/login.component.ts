import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../../servicios/peticiones.service';
import { ActivatedRoute, Router } from '@angular/router';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {

constructor(private peticion: PeticionesService, private route:Router, private activeRoute: ActivatedRoute){}

  email:string = ''
  password:string =''
  
  ngOnInit(): void {
    let miEmail = this.activeRoute.snapshot.params['email']
    if(miEmail != undefined){
      this.email = miEmail
    }
  }

login(){

  var post ={
    host:this.peticion.HostLocal,
    path:'/api/usuarios/Login',
    payload:{
      email:this.email,
      password:this.password
    }
  }

  this.peticion.Post(post.host+post.path,post.payload).then((respuesta:any)=>{  
    console.log(respuesta)

    if(respuesta.state == false){
      Notiflix.Notify.failure(respuesta.mensaje)
    }else{
      Notiflix.Notify.success(respuesta.mensaje)
      this.route.navigate(['/dashboard'])
    }
  })


}



}





