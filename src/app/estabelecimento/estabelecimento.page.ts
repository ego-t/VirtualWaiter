import { Session } from './../models/Session';
import { Menu } from './../models/Menu';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfoEstabelecimentoPage } from '../info-estabelecimento/info-estabelecimento.page';
import { DatabaseService } from '../services/database.service';
import { EstabelecimentoService } from '../services/Establishment.service';
import { Establishment } from '../models/Establishment';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {
  arrayPos = 0;
  valorPedido = 0;
  textoPesquisa = '';

  estabelecimento: Establishment;
  menu: Menu;
  secoesEstabelecimento: Array<Session> = [];
  secoesApi: Array<Session> = [];

  public produtosMock: Array<{ id: number; nome: string; descricao: string; preco: string; imageURL: string }> = [];
  public produtos: Array<{ id: number; nome: string; descricao: string; preco: string; imageURL: string }> = [];
  idEstabelecimento = 0;
  private nomeEstabelecimento = '';
  private urlLogoEstabelecimento = '';

  constructor(private route: ActivatedRoute, private router: Router, public modalController: ModalController,
    public db: DatabaseService, private establishmentApi: EstabelecimentoService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('Entrou na tela Estabelecimento');
    this.loadInfoEstablishment();
    this.atualizarTotalPedido();
  }

  async loadInfoEstablishment() {
    this.idEstabelecimento = Number(this.route.snapshot.paramMap.get('id'));
    this.establishmentApi.getById(Number(this.idEstabelecimento)).subscribe((data) => {

    });

    await this.establishmentApi.getById(this.idEstabelecimento).subscribe((data) => {
      console.log(data[this.arrayPos]);
      if (data[this.arrayPos] != null) {
        this.estabelecimento = data[this.arrayPos];
        this.menu = data[this.arrayPos].cardapio;
        this.secoesApi = this.menu.secoes;
        this.nomeEstabelecimento = this.estabelecimento.razaosocial;
        this.urlLogoEstabelecimento = this.estabelecimento.logo;
        this.filtrarPesquisa();
        console.log(this.menu);
      }
    });
  }

  goTo(idProduto: string) {
    this.router.navigate(['/item-cardapio/' + idProduto]);
  }

  async abrirInfoEstabelecimento() {
    const modal = await this.modalController.create({
      component: InfoEstabelecimentoPage,
      componentProps: {

      }
    });
    modal.present();
  }

  atualizarTotalPedido() {
    this.db.getTotalPedido().then(valorRetorno => {
      console.log('Valor pedido atualizado ' + valorRetorno);
      this.valorPedido = valorRetorno;
    });
  }

  filtrarPesquisa() {
    // Cria uma copia sem referencia de objeto
    this.secoesEstabelecimento = JSON.parse(JSON.stringify(this.secoesApi));

    this.secoesEstabelecimento.forEach(element => {
      element.produtos = element.produtos.filter(produto => produto.nome.toLowerCase().indexOf(this.textoPesquisa.toLowerCase()) !== -1);
    });
  }

  changeSearchBar(sender: { detail: { value: string; }; }) {
    this.textoPesquisa = sender.detail.value;
    this.filtrarPesquisa();
  }
}
