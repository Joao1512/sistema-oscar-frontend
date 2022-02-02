import { UsuarioService } from './../../../Services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credencial } from 'src/app/Model/Credencial';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credencial: Credencial = new Credencial();
  formLogin: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    })

    this.redirecionaUsuarioLogado()
  }

  public acessarEvento() {
    this.preencherCredencial()
    this.fazerLogin()
  }

  preencherCredencial() {
    this.credencial.email = this.formLogin.controls['email'].value;
    this.credencial.senha = this.formLogin.controls['senha'].value;
  }

  fazerLogin() {
    this.authService.fazerLogin(this.credencial).subscribe(res => {
      this.authService.guardarToken(res.access_token)      
      this.redirecionarHome()
      
    },
    error => {
      this.tratarErroFazerLogin(error)
    })
  }

  tratarErroFazerLogin(error) {
    if (error.status === 400) {
      this.abrirSnackBar('Credenciais incorretas', 'fechar')
    }
  }

  limparForm() {
    this.formLogin.controls.email.setValue('')
    this.formLogin.controls.senha.setValue('')
  }

  public abrirSnackBar(mensagem: string, textoBotao: string) {
    this._snackBar.open(mensagem, textoBotao, {duration: 5000})
  }

  public redirecionarHome() {   
     this.router.navigate(['/usuarios'])
  }

  public redirecionaUsuarioLogado() {
    if (this.authService.existeUsuarioAutenticado()) {
      this.redirecionarHome()
    }
  }
}
