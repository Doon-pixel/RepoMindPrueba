import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatematicasService {

  constructor() { }

  suma(a:number,b:number){
    return a+b
  }

  producto(a:number,b:number){
    return a*b
  }

  resta(a:number,b:number){
    return a-b
  }

  division(a:number,b:number){
    return a/b
  }







  
}
