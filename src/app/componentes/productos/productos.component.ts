import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PeticionesService } from '../../servicios/peticiones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


declare var $:any

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})



export class ProductosComponent {

 

constructor(public peticion: PeticionesService){}
  
    ngOnInit(): void {
      this.ListarTodosProducts()
    }

    products:any[]= []
    
  
  
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

