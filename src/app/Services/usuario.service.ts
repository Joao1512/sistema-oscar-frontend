import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = `${environment.API_URL}usuarios`;

  constructor(private http: HttpClient) {}

  public listarUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/listarUsuarios`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  public buscarPerfilUsuarioLogado(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/buscarPerfilUsuarioLogado`).pipe(
    catchError(e => {
      return throwError(e)
    })
    )
  }
}
