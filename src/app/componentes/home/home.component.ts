import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { PeticionesService } from '../../servicios/peticiones.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

marcas:any[] = []
products:any[]= []

ngOnInit(): void {
  this.ListarTodasMarcas()
  this.ListarTodosProducts()
}

constructor (public peticion: PeticionesService ){}

ListarTodasMarcas(){
  var post ={
        host:this.peticion.HostLocal,
        path:'/api/marcas/ListarTodos',
        payload:{
          
        }
      }
      this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
        this.marcas = respuesta
        
      })

}

ListarTodosProducts(){
    var post ={
          host:this.peticion.HostLocal,
          path:'/api/products/ListarTodos',
          payload:{
            
          }
        }
        this.peticion.Get(post.host+post.path).then((respuesta:any)=>{  
          this.products = respuesta
          
        })
  
  }



















}
