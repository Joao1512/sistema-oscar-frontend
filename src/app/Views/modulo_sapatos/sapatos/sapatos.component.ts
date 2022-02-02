import { MatSnackBar } from '@angular/material/snack-bar';
import { Sapato } from './../../../Model/sapato';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SapatosService } from 'src/app/Services/sapatos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sapatos',
  templateUrl: './sapatos.component.html',
  styleUrls: ['./sapatos.component.css']
})
export class SapatosComponent implements OnInit {

  public filtro: Sapato = new Sapato();
  public formFiltro: FormGroup
  public sapatos: Sapato[] = []

  public displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Sapato>;

  constructor(
    private sapatosService: SapatosService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,) { 
      this.displayedColumns = [ 'marca', 'cor', 'preco', 'tamanho', 'categoria', 'descricao', 'dataCadastro', 'quantidadeEstoque','acoes']

      this.formFiltro = this.formBuilder.group({
        id: [null],
        cor: [null],
        preco: [null],
        marca: [null],
        tamanho: [null],
        categoria: [null],
        descricao: [null],
        dataCadastro: [null],
        quantidadeEstoque: [null],
      })
  }

  ngOnInit(): void {
    this.buscarSapatos()
  }

  buscarSapatos() {
    this.sapatosService.listarFiltrado(this.filtro).subscribe( sapatos => {      
      this.organizarTabela(sapatos)
    })
  }

  public organizarTabela(sapatos) {
    this.dataSource = new MatTableDataSource<Sapato>(sapatos);
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item)
      return item[property];
   };
    this.dataSource.sort = this.sort;
  }

  private preencherFiltro() {
    this.filtro.id = this.formFiltro.controls.id.value
    this.filtro.cor = this.formFiltro.controls.cor.value
    this.filtro.preco = this.formFiltro.controls.preco.value
    this.filtro.marca = this.formFiltro.controls.marca.value
    this.filtro.tamanho = this.formFiltro.controls.tamanho.value
    this.filtro.categoria = this.formFiltro.controls.categoria.value
    this.filtro.descricao = this.formFiltro.controls.descricao.value
    this.filtro.dataCadastro = this.formFiltro.controls.dataCadastro.value
    this.filtro.quantidadeEstoque = this.formFiltro.controls.quantidadeEstoque.value
  }

  public onFiltrar() {
    this.preencherFiltro()
    this.buscarSapatos()
  }

  public onLimpar() {
    this.formFiltro.controls.id.setValue(null)
    this.formFiltro.controls.cor.setValue(null)
    this.formFiltro.controls.preco.setValue(null)
    this.formFiltro.controls.marca.setValue(null)
    this.formFiltro.controls.tamanho.setValue(null)
    this.formFiltro.controls.categoria.setValue(null)
    this.formFiltro.controls.descricao.setValue(null)
    this.formFiltro.controls.dataCadastro.setValue(null)
    this.formFiltro.controls.quantidadeEstoque.setValue(null)

    this.onFiltrar()
  }

  public onExcluir(id: number) {
    if (this.temPermissaoExcluir()) {
        this.sapatosService.excluir(id).subscribe(res => {
        this.abrirSnackBar(`Sapato excluído com sucesso.`, `Fechar`)
        this.onFiltrar()
      })
    }
    else {
      this.abrirSnackBar(`Sem permissão para excluir.`, `Fechar`)

    }
  }

  public abrirSnackBar(mensagem: string, acao: string) {
    this._snackBar.open(mensagem, acao, {duration: 5000})
  }

  public temPermissaoExcluir(): boolean {
    if (this.authService.existeHoleNaCredencial("ROLE_DELETAR_SAPATO")) return true
    return false
  }

}
