import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../../Services/usuario.service';
import 'animate.css';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any;
  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.buscarUsuarios()
  }

  public buscarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }
}
