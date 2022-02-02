import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../Services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler):

    Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          catchError(e => {
    
            if (e.status == 401){
              this.authService.logOut()
              this.router.navigate(['/usuarios']);
            }
    
            if (e.status == 403){
              alert('Acesso negado, você não possui acesso a este recurso!');
              this.router.navigate(['/usuarios']);
            }
            return throwError(e);
          })
        );
      }
}