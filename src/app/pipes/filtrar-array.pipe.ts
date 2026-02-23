import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarArray',
  standalone: true
})
export class FiltrarArrayPipe implements PipeTransform {

  transform(datos: any[], campo:string, valor:string): any[] {
    if(valor.trim() == ''){
      return datos
    }else{
      var resultado = datos.filter((item)=> item[campo].toLowerCase().includes( valor.toLowerCase()))
      return resultado;
    }
  }

}

