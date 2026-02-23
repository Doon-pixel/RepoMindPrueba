import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import Notiflix from 'notiflix';
import { PeticionesService } from '../../servicios/peticiones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MenulateralComponent,CommonModule,FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

constructor(private peticion: PeticionesService){}

  ngOnInit(): void {
    this.ListarTodos()
  }
  
  nombre:string=''
  descripcion:string=''
  precio:String=''
  imagen:string='assets/default.png'
  datos:any[] = []
  idSeleccionado:string = ''


  nuevo(){
    this.nombre=''
    this.precio='0'
    this.descripcion=''
    this.imagen='assets/default.png'
    this.idSeleccionado=''
    $('#misDatos').modal('show')
  }

  Guardar(){
    var post ={
        host:this.peticion.HostLocal,
        path:'/api/servicios/Guardar',
        payload:{
          nombre:this.nombre,
          precio:this.precio,
          descripcion:this.descripcion,
          imagen:this.imagen
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
        path:'/api/servicios/ListarTodos',
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
        path:'/api/servicios/ListarID/'+identificador,
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
        this.precio = respuesta[0].precio
        this.descripcion = respuesta[0].descripcion
        this.imagen = respuesta[0].imagen
        $('#misDatos').modal('show')
        return true
      }
        
      })
}

Actualizar(){

  var post ={
        host:this.peticion.HostLocal,
        path:'/api/servicios/Actualizar/',
        payload:{
          _id:this.idSeleccionado,
          nombre:this.nombre,
          precio:this.precio,
          descripcion:this.descripcion,
          imagen:this.imagen
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
        path:'/api/servicios/Eliminar/',
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

  
}
