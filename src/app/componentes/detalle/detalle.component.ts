import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { PeticionesService } from '../../servicios/peticiones.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent   implements OnInit{

constructor(private activeroute: ActivatedRoute, public peticion: PeticionesService){}

idSeleccionado:string = ''
datos:any ={}
nombre:string=''


ngOnInit(): void {
  let identificador:string =''
  identificador = this.activeroute.snapshot.params['id']
  console.log(identificador)
  this.cargarId(identificador)
}

cargarId(identificador:string){
   
    var post ={
          host:this.peticion.HostLocal,
          path:'/api/products/ListarID/'+identificador,
          payload:{
            
          }
        }
        this.peticion.Get(post.host+post.path).then((respuesta:any)=>{ 
          this.datos =respuesta[0]
})
}














}
