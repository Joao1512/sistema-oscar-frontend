import { Funcionalidade } from './../../../../Model/funcionalidade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/Model/perfil';
import { Permissao } from 'src/app/Model/permissao';
import { PerfisService } from 'src/app/Services/perfis.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfis-form',
  templateUrl: './perfis-form.component.html',
  styleUrls: ['./perfis-form.component.css']
})
export class PerfisFormComponent implements OnInit {

  public perfil: Perfil;
  public idPerfil: number;
  public formPerfil: FormGroup
  public funcionalidades: Funcionalidade[] = []

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private perfisService: PerfisService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.formPerfil = this.formBuilder.group({
      nome: ['' , Validators.required],
    })
  }

  ngOnInit(): void {
    this.pegarIdPelaRota()
  }

  buscarPerfilPorId(id: number) {
    this.perfisService.buscarPerfilPorId(id).subscribe(res => {
      this.perfil = res;     
      this.preencherFormulárioPerfil()
    })
  }

  pegarIdPelaRota() {
    this.activatedRoute.params.subscribe(params => {
      this.idPerfil = params.id
      this.idPerfil !== undefined ? this.buscarPerfilPorId(this.idPerfil) : this.criaNovoPerfil()
    })
  }

  criaNovoPerfil() {
    let perfil: Perfil = this.perfilFactory()
    this.perfil = perfil;
    this.buscarFuncionalidades()
  }

  perfilFactory() {
    return new Perfil()
  }


  buscarFuncionalidades() {
    this.perfisService.buscarFuncionalidades().subscribe(res => {
      this.funcionalidades = res;
      this.organizaPermissoesAoPerfil()
    })
  }

  organizaPermissoesAoPerfil() {
    this.funcionalidades.forEach(funcionalidade => {
    let novaPermissao = this.criaNovaPermissao(funcionalidade)
      this.adicionaNovaPermissaoAoPerfil(novaPermissao);
    })
  }

  criaNovaPermissao(funcionalidade): Permissao {
    let novaPermissao: Permissao = this.permissaoFactory()
    novaPermissao.funcionalidade = funcionalidade;
    novaPermissao.habilitada = false
    return novaPermissao;
  }

  permissaoFactory(): Permissao {
    return new Permissao()
  }

  adicionaNovaPermissaoAoPerfil(permissao: Permissao) {
    this.perfil.permissoes.push(permissao);
  }

  preencherFormulárioPerfil() {
    this.formPerfil.controls.nome.setValue(this.perfil.nome)
  }

  public onSalvarEvento() {
    this.preencherPerfil()    
    if (this.perfil.id !== null && this.perfil.id !== undefined) {
      this.editarPerfil()
    }
    else {
      this.cadastrarPerfil()
    }
  }

  preencherPerfil() {
    this.perfil.nome = this.formPerfil.controls.nome.value
  }

  cadastrarPerfil() {
    this.perfisService.cadastrarPerfil(this.perfil).subscribe(res => {
      this.abrirSnackBar('Perfil Cadastrado com sucesso', 'Fechar')
      this.router.navigate(['/perfis'])
    })
  }
  public abrirSnackBar(mensagem: string, acao: string) {
    this._snackBar.open(mensagem, acao, {duration: 5000})
  }

  editarPerfil() {    
    this.perfisService.editarPerfil(this.perfil).subscribe(res => {
      this.abrirSnackBar('Edição Concluída com sucesso', 'Fechar')
      this.router.navigate(['/perfis'])
    })
  }

  public onHabilitadoEvento(permissaoSelecionada: Permissao):void {
    this.setPermissaoHabilitadaPerfil(permissaoSelecionada)
  }

  public setPermissaoHabilitadaPerfil(permissaoSelecionada: Permissao):void  {
    this.perfil.permissoes.filter(permissao => permissao.funcionalidade.id === permissaoSelecionada.funcionalidade.id)[0].habilitada = !permissaoSelecionada.habilitada          
  }

}
