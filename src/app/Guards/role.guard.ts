import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.existeUsuarioAutenticado()){
        this.router.navigate(['/login']);
        return false;
      }

      let role = next.data['role'] as string;

      if (this.authService.existeHoleNaCredencial(role)){
        return true;
      }

      this.router.navigate(['/home']);
      this.abrirSnackBar('Acesso negado, você não possui acesso a este recurso!', 'fechar');
      return false;
    }

    abrirSnackBar(mensagem: string, acao: string) {
        this._snackBar.open(mensagem, acao, {duration: 5000})
    }

  }
