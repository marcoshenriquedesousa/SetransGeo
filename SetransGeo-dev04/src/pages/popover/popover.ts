import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InfoLinhaPage } from '../info-linha/info-linha';
import { InfoEmpresaPage } from '../info-empresa/info-empresa';
import { EditEmpresaPage } from '../edit-empresa/edit-empresa';
import { EditLinhaPage } from '../edit-linha/edit-linha';

@IonicPage()
@Component({
  selector: 'page-popover',
  template: `
    <ion-list>
      <ion-list-header>Opções</ion-list-header>
      <button ion-item (click)="info(codigo, pageInfo)">Informações</button>
      <button ion-item (click)="editar(codigo, pageEdit)">Editar</button>
    </ion-list>
  `
})
export class PopoverPage {
    codigo;
    pageInfo;
    pageEdit;
    constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
      this.codigo = this.navParams.get('codigo');
      this.pageInfo = this.navParams.get('pageInfo');
      this.pageEdit = this.navParams.get('pageEdit');
  }

  info(cod, pagInfo) {
    console.log(pagInfo);
    this.viewCtrl.dismiss();
    this.navCtrl.push(pagInfo, {codigo: cod});
  }

  editar(cod, pagEdit) {
    console.log(pagEdit);
    this.viewCtrl.dismiss();
    this.navCtrl.push(pagEdit, {codigo: cod});
  }

}