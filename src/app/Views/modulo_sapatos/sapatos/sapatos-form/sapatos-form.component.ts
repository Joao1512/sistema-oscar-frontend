import { MatSnackBar } from '@angular/material/snack-bar';
import { Sapato } from './../../../../Model/sapato';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SapatosService } from 'src/app/Services/sapatos.service';

@Component({
  selector: 'app-sapatos-form',
  templateUrl: './sapatos-form.component.html',
  styleUrls: ['./sapatos-form.component.css']
})
export class SapatosFormComponent implements OnInit {

  public formSapatos: FormGroup
  public idSapato: number
  public sapato: Sapato

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sapatosService: SapatosService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.formSapatos = this.formBuilder.group({
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
    this.pegarIdPelaRota()
  }

  pegarIdPelaRota() {
    this.activatedRoute.params.subscribe(params => {
      this.idSapato = params.id
      this.idSapato !== undefined ? this.buscarSapatoPorId(this.idSapato) : this.criarNovoSapato()
    })
  }

  private buscarSapatoPorId(id: number) {
    this.sapatosService.buscarPorId(id).subscribe(sapato => {
      this.sapato = sapato
      console.log(this.sapato);
      
      this.preencherFormulárioSapato()
    })
  }

  criarNovoSapato() {
    let sapato: Sapato = this.sapatoFactory()
    this.sapato = sapato
  }

  sapatoFactory() {
    return new Sapato()
  }

  preencherFormulárioSapato() {
    this.formSapatos.controls.id.setValue(this.sapato.id)
    this.formSapatos.controls.cor.setValue(this.sapato.cor)
    this.formSapatos.controls.marca.setValue(this.sapato.marca)
    this.formSapatos.controls.preco.setValue(this.sapato.preco)
    this.formSapatos.controls.tamanho.setValue(this.sapato.tamanho)
    this.formSapatos.controls.categoria.setValue(this.sapato.categoria)
    this.formSapatos.controls.descricao.setValue(this.sapato.descricao)
    this.formSapatos.controls.dataCadastro.setValue(this.sapato.dataCadastro)
    this.formSapatos.controls.quantidadeEstoque.setValue(this.sapato.quantidadeEstoque)
  }

  public onSalvar() {
    this.preencherSapatoEditado()
    if (this.sapato.id !== null && this.sapato.id !== undefined) {
      this.editar()
    }
    else {
      this.cadastrar()
    }
  }

  private editar() {
    this.sapatosService.editar(this.sapato).subscribe(res => {
      this.abrirSnackBar('Edição Concluída com sucesso', 'Fechar')
    })
  }

  private cadastrar() {
    this.sapatosService.cadastrar(this.sapato).subscribe(res => {
      this.abrirSnackBar('Cadastro Concluído com sucesso', 'Fechar')
    })
  }

  private preencherSapatoEditado() {
    this.sapato.cor = this.formSapatos.controls.cor.value
    this.sapato.marca = this.formSapatos.controls.marca.value
    this.sapato.preco = this.formSapatos.controls.preco.value
    this.sapato.tamanho = this.formSapatos.controls.tamanho.value
    this.sapato.categoria = this.formSapatos.controls.categoria.value
    this.sapato.descricao = this.formSapatos.controls.descricao.value
    this.sapato.dataCadastro = this.formSapatos.controls.dataCadastro.value
    this.sapato.quantidadeEstoque = this.formSapatos.controls.quantidadeEstoque.value

  }

  public abrirSnackBar(mensagem: string, acao: string) {
    this._snackBar.open(mensagem, acao, {duration: 5000})
  }

}
