import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonLabel } from '@ionic/angular';

import { DatabaseService, Produto } from './../../app/services/database.service';

@Component({
  selector: 'app-item-cardapio',
  templateUrl: './item-cardapio.page.html',
  styleUrls: ['./item-cardapio.page.scss'],
})
export class ItemCardapioPage implements OnInit {
  qtdItem: number = 0;
  observacao: string = "";

  pedido = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.qtdItem = 0
  }

  addQtd(){
    this.qtdItem += 1
  }

  removerQtd(){
    if(this.qtdItem > 0)
      this.qtdItem -= 1
  }


  adicionarItem(){
    this.router.navigate(['/estabelecimento/1'])
  }
}
