import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../Model/perfil';
import { Funcionalidade } from '../Model/funcionalidade';

@Injectable({
  providedIn: 'root'
})
export class PerfisService {

  
  constructor(private http: HttpClient) { }

    private urlEndpoint: string = `${environment.API_URL}perfis`

    buscarPerfisParaTabela():Observable<Perfil> {
     return this.http.get<Perfil>(`${this.urlEndpoint}/buscarPerfisParaTabela`).pipe(
        catchError(e => {
          return throwError(e)
        })
      )
    }

    buscarPerfilPorId(id: number):Observable<Perfil> {
      return this.http.get<Perfil>(`${this.urlEndpoint}/buscarPerfilPorId/${id}`).pipe(
         catchError(e => {
           return throwError(e)
         })
       )
     }

    excluirPerfil(id: number):Observable<any> {
      return this.http.delete(`${this.urlEndpoint}/excluir/${id}`).pipe(
        catchError(e => {
          return throwError(e)
        })
      )
    }

    editarPerfil(perfil: Perfil): Observable<object> {
      return this.http.post(`${this.urlEndpoint}/editar`, perfil).pipe(
        catchError(e => {
          return throwError(e)
        })
      )
    }
    
    cadastrarPerfil(perfil: Perfil): Observable<any> {
      return this.http.post(`${this.urlEndpoint}/cadastrar`, perfil).pipe(
        catchError(e => {
          return throwError(e)
        })
      )
    }

    buscarFuncionalidades(): Observable<Funcionalidade[]> {
      return this.http.get<Funcionalidade[]>(`${this.urlEndpoint}/buscarFuncionalidades`).pipe(
        catchError(e => {
          return throwError(e)
        })
      )
    }
}
