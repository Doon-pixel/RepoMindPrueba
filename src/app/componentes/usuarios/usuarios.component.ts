import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
import { PeticionesService } from '../../servicios/peticiones.service';
declare var $ : any

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent,FormsModule,CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
constructor(public peticion: PeticionesService){}

  ngOnInit(): void {
    this.ListarTodos()
    this.ListarTodosRoles()
  }
  
  nombre:string=''
  email:string=''
  password:string=''
  rol:string =''
  estado:string='activo'
  idrol:string =''
  datos:any[] = []
  datosRoles:any[]=[]
  idSeleccionado:string = ''


  nuevo(){
    this.nombre=''
    this.email=''
    this.password=''
    this.rol=''
    this.estado='activo'
    this.idrol=''
    this.idSeleccionado=''
    $('#misDatos').modal('show')
  }

  Guardar() {
    var posicion = this.datosRoles.findIndex(item => item._id == this.idrol)
    if (posicion == -1) {
        this.rol = ""
    } else {
        this.rol = this.datosRoles[posicion].nombre
    }

    var post = {
        host: this.peticion.HostLocal,
        path: "/api/usuarios/Guardar",
        payload: {
            nombre: this.nombre,
            email: this.email,
            password: this.password,
            idrol: this.idrol,
            rol: this.rol,
            estado:this.estado
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
        path:'/api/usuarios/ListarTodos',
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
        path:'/api/usuarios/ListarID/'+identificador,
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
        this.email = respuesta[0].email
        this.password = respuesta[0].password
        this.idrol = respuesta[0].idrol
        this.estado = respuesta[0].estado
        this.rol = respuesta[0].rol
        $('#misDatos').modal('show')
        return true
      }
        
      })
}

Actualizar(){

  var posicion = this.datosRoles.findIndex(item => item._id == this.idrol)
    if (posicion == -1) {
        this.rol = ""
    } else {
        this.rol = this.datosRoles[posicion].nombre
    }

  var post ={
        host:this.peticion.HostLocal,
        path:'/api/usuarios/Actualizar/',
        payload:{
          _id:this.idSeleccionado,
          nombre:this.nombre,
          rol:this.rol,
          estado:this.estado,
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
        path:'/api/usuarios/Eliminar/',
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
























} // Fin de las funcionalidades