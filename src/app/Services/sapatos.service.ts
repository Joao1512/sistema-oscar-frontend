import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Sapato } from '../Model/sapato';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SapatosService {

  constructor(private http: HttpClient) { }

  private urlEndpoint: string = `${environment.API_URL}sapatos`

  listarFiltrado(sapato: Sapato):Observable<Sapato> {    
    return this.http.post<Sapato>(`${this.urlEndpoint}/listarFiltrado`, sapato).pipe(
       catchError(e => {
         return throwError(e)
       })
     )
   }

   buscarPorId(id: number):Observable<Sapato> {
    return this.http.get<Sapato>(`${this.urlEndpoint}/buscarPorId/${id}`).pipe(
       catchError(e => {
         return throwError(e)
       })
     )
   }

   cadastrar(sapato: Sapato):Observable<Sapato> {
     console.log(sapato);
     
    return this.http.post<Sapato>(`${this.urlEndpoint}/cadastrar`, sapato).pipe(
       catchError(e => {
         return throwError(e)
       })
     )
   }

   editar(sapato: Sapato):Observable<Sapato> {
    return this.http.post<Sapato>(`${this.urlEndpoint}/editar`, sapato).pipe(
       catchError(e => {
         return throwError(e)
       })
     )
   }

   excluir(id: number):Observable<any> {
    return this.http.delete(`${this.urlEndpoint}/excluir/${id}`).pipe(
       catchError(e => {
         return throwError(e)
       })
     )
   }
}
