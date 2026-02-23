import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { PeticionesService } from '../../servicios/peticiones.service';
declare var Chart : any

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenulateralComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  constructor( private peticion: PeticionesService){}

  ngOnInit(): void {
    this.ListarIngresos()
    this.TotalGeneral(0)
  }

ListarIngresos(){

   var post ={
    host:this.peticion.HostLocal,
    path:'/api/bitacoraAcceso/ListarIngresos',
    payload:{
      
    }
  }

  this.peticion.Get(post.host+post.path).then((respuesta:any)=>{
    console.log(respuesta)

    let nombres = respuesta.map((item:any)=> item._id)
    let valores = respuesta.map((item:any)=> item.total)



  const ctx = document.getElementById('mychart') as HTMLCanvasElement;
          new Chart (ctx, {
            type: 'bar', // Tipo de gráfico
            data: {
              labels: nombres, // Etiquetas del eje x
              datasets: [{
                label: 'Lista de Ingresos', // Etiqueta del conjunto de datos
                data: valores, // Datos del conjunto de datos
                backgroundColor: [
                  '#2196F3',
                  '#8BC34A',
                  '#FF9800',
                  '#607d8b',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ], // Colores de fondo de las barras
                borderColor: [
                  '#2196F3',
                  '#8BC34A',
                  '#FF9800',
                  '#607d8b',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ], // Colores de borde de las barras
                borderWidth: 1 // Ancho del borde de las barras
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              // scales: {
              //   y: {
              //     beginAtZero: true // Comenzar el eje y en cero
              //   }
              // }
            }
          });    

  })


}

TotalGeneral(totales:number){

   var post ={
    host:this.peticion.HostLocal,
    path:'/api/bitacoraAcceso/ListarIngresos',
    payload:{
      
    }
  }

  this.peticion.Get(post.host+post.path).then((respuesta:any)=>{
    console.log(respuesta)


    totales = respuesta.reduce((acumulador:number,item:any) => {
      return acumulador + (item.total || 0)},0)

    // totales = 0

    // for(let a = 0  ; a < respuesta.length;a++){
    //   totales +=  respuesta[a].total
    // }

  const ctx = document.getElementById('totalchart') as HTMLCanvasElement;
          new Chart (ctx, {
            type: 'bar', // Tipo de gráfico
            data: {
              labels: ['Ingresos'], // Etiquetas del eje x
              datasets: [{
                label: 'Ingresos Totales', // Etiqueta del conjunto de datos
                data: [totales], // Datos del conjunto de datos
               }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              }
          });    

  })


}


}
