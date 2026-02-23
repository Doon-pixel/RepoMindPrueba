import { Component } from '@angular/core';
import Notiflix from 'notiflix';
import { PeticionesService } from '../../servicios/peticiones.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { FiltrarArrayPipe } from '../../pipes/filtrar-array.pipe';
declare var $:any

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [FormsModule, CommonModule, MenulateralComponent,FiltrarArrayPipe],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent {
constructor(private peticion: PeticionesService){}

  ngOnInit(): void {
    this.ListarTodos()
    this.ListarTodosRoles()
    this.ListarRoutes()
  }
  
  listaRutas:any[]=[]
  nombrePermiso:string=''
  criterio:string = ''
  nombre:string=''
  idrol:string=''
  datos:any[] = []
  datosRoles:any []=[]
  idSeleccionado:string = ''


  nuevo(){
    this.nombre=''
    this.idrol=''
    this.idSeleccionado=''
    $('#misDatos').modal('show')
  }

  Guardar(){
    var post ={
        host:this.peticion.HostLocal,
        path:'/api/permisos/Guardar',
        payload:{
          nombre:this.nombre,
          idrol:this.idrol,
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
        path:'/api/permisos/ListarTodos',
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
        path:'/api/permisos/ListarID/'+identificador,
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
        this.idrol = respuesta[0].idrol
        $('#misDatos').modal('show')
        return true
      }
        
      })
}

Actualizar(){

  var post ={
        host:this.peticion.HostLocal,
        path:'/api/permisos/Actualizar/',
        payload:{
          _id:this.idSeleccionado,
          nombre:this.nombre,
          idrol:this.idrol
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
        path:'/api/permisos/Eliminar/',
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

ListarTodosRoles(){
  var post ={
        host:this.peticion.HostLocal,
        path:'/api/roles/ListarTodos',
        payload:{
          
        }
      }
      this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
        this.datosRoles = respuesta
        
      })

}

ListarRoutes(){
  var post ={
        host:this.peticion.HostLocal,
        path:'/api/getRoutes',
        payload:{
          
        }
      }
      this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
        this.listaRutas = respuesta
        
      })

}































} // Fin de las funcionalidades
