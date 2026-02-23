import { Component, Host, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { PeticionesService } from '../../servicios/peticiones.service';
import Notiflix from 'notiflix';
import { FactoryTarget } from '@angular/compiler';
import { CommonModule } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [MenulateralComponent,FormsModule,CommonModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent implements OnInit {
  
  constructor(public peticion: PeticionesService){}

  ngOnInit(): void {
    this.ListarTodos()
  }
  
  nombre:string=''
  destino:string=''
  datos:any[] = []
  idSeleccionado:string = ''
  archivo!:File 
  random:string =''


  nuevo(){
    this.nombre=''
    this.destino=''
    this.idSeleccionado=''
    $('#misDatos').modal('show')
  }

  Guardar(){
    var post ={
        host:this.peticion.HostLocal,
        path:'/api/marcas/Guardar',
        payload:{
          nombre:this.nombre,
          destino:this.destino
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
        path:'/api/marcas/ListarTodos',
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
        path:'/api/marcas/ListarID/'+identificador,
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
        this.destino= respuesta[0].destino
        $('#misDatos').modal('show')
        return true
      }
        
      })
}

Actualizar(){

  var post ={
        host:this.peticion.HostLocal,
        path:'/api/marcas/Actualizar/',
        payload:{
          _id:this.idSeleccionado,
          nombre:this.nombre,
          destino:this.destino
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
        path:'/api/marcas/Eliminar/',
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

onFileSelected(event:any){
  this.archivo = event.target.files[0]
  this.upload()  // esta funcion esta aqui subir el archivo despues que sea seleccionado , sin necesidad de boton ( por el orden del codigo se ejecuta despues de la seleccion)

}

upload(){

  var post ={
    host: this.peticion.HostLocal,
    path:'/api/marcas/subirImagen/'+ this.idSeleccionado
  }

  this.peticion.uploadFile(this.archivo,post.host+post.path).subscribe((respuesta:any)=>{
    console.log(respuesta)
    if(respuesta.state == false){
      Notiflix.Notify.failure(respuesta.mensaje)
    }else{
      Notiflix.Notify.success(respuesta.mensaje)
      this.random = this.miRandom()
    }
  })


}

miRandom(){
  return Math.floor(Math.random()*(9999 - 1000) + 1000).toString()
}

























} // Fin funcionalidades
