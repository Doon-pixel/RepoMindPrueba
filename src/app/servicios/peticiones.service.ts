import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http: HttpClient) { }

HostLocal:string = 'http://localhost:3000'

requestOptions: any ={}

Post(url:string,payload:any){

    let promise = new Promise((resolve, reject) =>{
      this.requestOptions={
        headers: new HttpHeaders({
          // '':''
        }), withCredentials:true
      }

      this.http.post(url,payload,this.requestOptions)
      .toPromise()
      .then((respuesta:any) =>{
        console.log(respuesta)
        resolve(respuesta)
      }).catch((error)=>{
        reject(error)
      })
    })
    return promise

}

Get(url:string){

  this.requestOptions={
        headers: new HttpHeaders({
          // '':''
        }), withCredentials:true
      }

    let promise = new Promise((resolve, reject) =>{
      this.http.get(url,this.requestOptions)
      .toPromise()
      .then((respuesta:any) =>{
        console.log(respuesta)
        resolve(respuesta)
      }).catch((error)=>{
        reject(error)
      })
    })
    return promise

  }

Put(url:string,payload:any){

    let promise = new Promise((resolve, reject) =>{
      this.requestOptions={
        headers: new HttpHeaders({
          // '':''
        }), withCredentials:true
      }

      this.http.put(url,payload,this.requestOptions)
      .toPromise()
      .then((respuesta:any) =>{
        console.log(respuesta)
        resolve(respuesta)
      }).catch((error)=>{
        reject(error)
      })
    })
    return promise

}

Delete(url:string,payload:any){
  let promise = new Promise((resolve,reject)=>{
    
    const requestOptions ={
        headers: new HttpHeaders({
          // '':''
        }), withCredentials:true,
        body:payload
      }

    this.http.request('DELETE',url, requestOptions)
    .toPromise()
      .then((respuesta:any) =>{
        console.log(respuesta)
        resolve(respuesta)
      }).catch((error)=>{
        reject(error)
      })  
  })
  return promise
}

uploadFile(file:File, api: string): Observable <any>{

  this.requestOptions={
        headers: new HttpHeaders({
          // '':''
        }), withCredentials:true
      }

  const formData = new FormData
  formData.append('file',file)
  return this.http.post(api,formData,this.requestOptions)

}

















} // aca finaliza la lista de funcionalidades
