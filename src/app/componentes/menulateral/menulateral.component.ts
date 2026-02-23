import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { PeticionesService } from '../../servicios/peticiones.service';
import Notiflix, { Notify } from 'notiflix';


@Component({
  selector: 'app-menulateral',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent implements OnInit{

  nombre:string = 'Cargando...'
  rol:string = 'Cargando...'

  constructor (private peticion: PeticionesService, private route : Router){}

ngOnInit(): void {
  this.verStatus()
}


verStatus(){
    var post ={
    host:this.peticion.HostLocal,
    path:'/api/usuarios/Status',
    payload:{
    }
  }

  this.peticion.Get(post.host+post.path).then((respuesta:any)=>{
    console.log(respuesta)
    if(respuesta.nombre == undefined){
      this.route.navigate(['/login'])
    }
    this.nombre = respuesta.nombre
    this.rol = respuesta.rol
})


}

cerrarSesion(){
  var post ={
    host:this.peticion.HostLocal,
    path:'/api/usuarios/Logout',
    payload:{
    }
  }

  this.peticion.Post(post.host+post.path,post.payload).then((respuesta:any)=>{
    if(respuesta.state == false){
      Notiflix.Notify.failure(respuesta.mensaje)
    }else{
      Notiflix.Notify.success(respuesta.mensaje)
      this.route.navigate(['/login'])
    }
  })
}











}// Aqui finalizan las funcionalidades

