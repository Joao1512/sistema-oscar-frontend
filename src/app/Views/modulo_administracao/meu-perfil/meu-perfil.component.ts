import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.buscarPerfilUsuarioLogado()
  }

  buscarPerfilUsuarioLogado() {
    this.usuarioService.buscarPerfilUsuarioLogado().subscribe(res => {
      console.log(res)
    })
  }

}
