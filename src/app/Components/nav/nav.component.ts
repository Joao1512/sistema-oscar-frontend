import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public sairEvento(): void {
    this.fazerLogout()
  }

  public entrarEvento(): void {
    this.redirecionarParaLogin()
  }

  fazerLogout(): void {
    this.authService.logOut()
    this.redirecionarParaLogin()
  }

  redirecionarParaLogin(): void {
    this.router.navigate(['/login'])
  }

  public existeUsuarioAutenticado(): boolean {
    return this.authService.existeUsuarioAutenticado()
  }

}
