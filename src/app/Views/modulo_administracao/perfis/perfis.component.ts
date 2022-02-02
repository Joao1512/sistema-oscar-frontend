import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Perfil } from 'src/app/Model/perfil';
import { AuthService } from 'src/app/Services/auth.service';
import { PerfisService } from 'src/app/Services/perfis.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css']
})
export class PerfisComponent implements OnInit {

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Perfil>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private perfilsService: PerfisService,
    ) { 
    this.displayedColumns = ['nomePerfil', 'acoes']
  }

  ngOnInit(): void {
    this.buscarPerfis()
  }

  buscarPerfis() {
    this.perfilsService.buscarPerfisParaTabela().subscribe(res => {
      this.organizarTabela(res)
      
    })
  }

  public organizarTabela(perfis) {
    this.dataSource = new MatTableDataSource<Perfil>(perfis);
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item)
      return item[property];
   };
    this.dataSource.sort = this.sort;
  }

  public excluirEvento(id: number): void {
    if (this.temPermissaoExcluir()) {
      this.excluirPerfil(id)
    }
    else {
      this.abrirSnackBar('Você não tem permissão para excluir.', 'Fechar')
    }
  }

  excluirPerfil(id: number): void {
    this.perfilsService.excluirPerfil(id).subscribe(res => {
      this.abrirSnackBar('Perfil excluído com sucesso', 'Fechar')
      this.buscarPerfis()
    },
    error => {
      this.tratarErroExcluirPerfil(error)
    })
  }

  public tratarErroExcluirPerfil(error) {
    if (error.status == 403) {
      this.abrirSnackBar('Você não tem permissão para excluir.', 'Fechar')
    }
    else {
      this.abrirSnackBar('Não foi possível excluir.', 'Fechar')
    }
  }

  public abrirSnackBar(mensagem: string, acao: string) {
    this._snackBar.open(mensagem, acao, {duration: 5000})
  }

  
  public temPermissaoExcluir(): boolean {
    if (this.authService.existeHoleNaCredencial("ROLE_EXCLUIR_PERFIL")) return true
    return false
  }

}
