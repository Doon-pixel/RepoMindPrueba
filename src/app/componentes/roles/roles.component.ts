import { Component, OnInit } from '@angular/core';
import Notiflix from 'notiflix';
import { PeticionesService } from '../../servicios/peticiones.service';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MenulateralComponent,FormsModule,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

constructor(private peticion: PeticionesService){}

  ngOnInit(): void {
    this.ListarTodos()
  }
  
  nombre:string=''
  datos:any[] = []
  idSeleccionado:string = ''


  nuevo(){
    this.nombre=''
    this.idSeleccionado=''
    $('#misDatos').modal('show')
  }

  Guardar(){
    var post ={
        host:this.peticion.HostLocal,
        path:'/api/roles/Guardar',
        payload:{
          nombre:this.nombre,
        }
      }

      // if ( this.nombre == undefined || this.nombre == '' || this.nombre == null){
      //   Notiflix.Notify.info('El campo nombre es obligatorio')
      //   return false
      // }
    
      this.peticion.Post(post.host+post.path,post.payload).then((respuesta:any)=>{  
        if ( respuesta.state == false){
          Notiflix.Notify.failure(respuesta.mensaje)
        }else{
          Notiflix.Notify.success(respuesta.mensaje)
          this.ListarTodos()
          $('#misDatos').modal('hide')
        }
    
        
      })
      // return true

}

ListarTodos(){
  var post ={
        host:this.peticion.HostLocal,
        path:'/api/roles/ListarTodos',
        payload:{
          
        }
      }
      this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
        this.datos = respuesta
        
      })

}

ListarId(identificador:string){
  console.log(identificador)

  this.idSeleccionado = identificador
  
  var post ={
        host:this.peticion.HostLocal,
        path:'/api/roles/ListarID/'+identificador,
        payload:{
          
        }
      }
      this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
      console.log(respuesta)
      if(respuesta.state == false){
          Notiflix.Notify.failure(respuesta.mensaje)
          return false    
      }
      else{
        this.nombre = respuesta[0].nombre
        $('#misDatos').modal('show')
        return true
      }
        
      })
}

Actualizar(){

  var post ={
        host:this.peticion.HostLocal,
        path:'/api/roles/Actualizar/',
        payload:{
          _id:this.idSeleccionado,
          nombre:this.nombre
        }
      }
      this.peticion.Put(post.host+post.path,post.payload).then((respuesta:any)=>{
        if ( respuesta.state == false){
          Notiflix.Notify.failure(respuesta.mensaje)
        }else{
          Notiflix.Notify.success(respuesta.mensaje)
          this.ListarTodos()
          $('#misDatos').modal('hide')
        }
      })
}

Eliminar(){

  var post ={
        host:this.peticion.HostLocal,
        path:'/api/roles/Eliminar/',
        payload:{
          _id:this.idSeleccionado,
        }
      }
      this.peticion.Delete(post.host+post.path,post.payload).then((respuesta:any)=>{
        if ( respuesta.state == false){
          Notiflix.Notify.failure(respuesta.mensaje)
        }else{
          Notiflix.Notify.success(respuesta.mensaje)
          this.ListarTodos()
          $('#misDatos').modal('hide')
        }
      })
}

























} // Fin de las funcionalidades