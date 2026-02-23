import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import Notiflix from 'notiflix';
import { PeticionesService } from '../../servicios/peticiones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MenulateralComponent,CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

 

constructor(public peticion: PeticionesService){}
  
    ngOnInit(): void {
      this.ListarTodos()
    }
    random:string=''
    archivo!:File
    nombre:string=''
    codigo:string=''
    datos:any[] = []
    idSeleccionado:string = ''
    precio:string=''
    cantidad:string=''
    descripcion:string=''
    datosTecnicos:string=''
    estado:string='activo'
    
  
  
    nuevo(){
      this.nombre=''
      this.codigo=''
      this.idSeleccionado=''
      this.cantidad='1'
      this.precio='1'
      this.descripcion=''
      this.datosTecnicos=''
      this.estado='activo'
      $('#misDatos').modal('show')
    }
  
    Guardar(){
      var post ={
          host:this.peticion.HostLocal,
          path:'/api/products/Guardar',
          payload:{
            nombre:this.nombre,
            codigo:this.codigo,
            cantidad:this.cantidad,
            precio:this.precio,
            descripcion:this.descripcion,
            datosTecnicos:this.datosTecnicos,
            estado:this.estado,
            
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
          path:'/api/products/ListarTodos',
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
          path:'/api/products/ListarID/'+identificador,
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
          this.codigo= respuesta[0].codigo
          this.cantidad=respuesta[0].cantidad
          this.precio=respuesta[0].precio
          this.descripcion=respuesta[0].descripcion
          this.datosTecnicos=respuesta[0].datosTecnicos
          this.estado=respuesta[0].estado
          $('#misDatos').modal('show')
          return true
        }
          
        })
  }
  
  Actualizar(){
  
    var post ={
          host:this.peticion.HostLocal,
          path:'/api/products/Actualizar/',
          payload:{
            _id:this.idSeleccionado,
            nombre:this.nombre,
            cantidad:this.cantidad,
            precio:this.precio,
            descripcion:this.descripcion,
            datosTecnicos:this.datosTecnicos,
            estado:this.estado
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
          path:'/api/products/Eliminar/',
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
      path:'/api/products/subirImagen/'+ this.idSeleccionado
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
  


}
