import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Credencial } from '../Model/Credencial';
import { DadosToken } from '../Model/dadosToken';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private _credencial: Credencial = new Credencial();

    private _token: string;

    private dadosTokenGuardado: any;

    private urlEndPoint: string = `${environment.API_URL}` + 'oauth/token';

    constructor(private httpClient: HttpClient) {

    }
    
    public get token(): string {
        if (this._token != null){
        return this._token;

        } else if (this._token == null && localStorage.getItem('token') != null){
        this._token = localStorage.getItem('token');
        return this._token;
        }
        return null;
    }

    public fazerLogin(credencial: Credencial):Observable<any> {
        const credenciais = btoa('client' + ':' + '12345');
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic '+credenciais})

        let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', credencial.email);
        params.set('password', credencial.senha);

        return this.httpClient.post<any>(this.urlEndPoint, params.toString(), {headers: httpHeaders})
    }

    public logOut() {
        this._token = null;
        this._credencial = null;
        localStorage.clear();
    }

    public guardarToken(accessToken: string): void{
        localStorage.setItem('token', accessToken);
    }

    public obterDadosTokenGuardado(): DadosToken {
        if (localStorage.getItem('token')) {
            let dadosToken: DadosToken = JSON.parse(this.b64DecodeUnicode(localStorage.getItem('token').split(".")[1]))
            return dadosToken; 
        }
    }

    public b64DecodeUnicode(str) {
      const padding = '='.repeat((4 - str.length % 4) % 4);
      const base64 = (str + padding).replace(/-/g, '+').replace(/_/g, '/');
  
      return decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }

    public existeHoleNaCredencial(hole: string): boolean {
        let dadosToken: DadosToken = this.obterDadosTokenGuardado()
        if (dadosToken.authorities.includes(hole)) return true
        return false
    }

    public existeUsuarioAutenticado() {
        let dadosTokenGuardado: DadosToken = this.obterDadosTokenGuardado()
        if (dadosTokenGuardado != null) {
            if (dadosTokenGuardado.login !== null) return true
            return false
        }
        return false
    }
}