import { CadEmpresaPage } from './../cad-empresa/cad-empresa';
import { CadLinhaPage } from './../cad-linha/cad-linha';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { ListEmpresaPage } from '../list-empresa/list-empresa';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public navController: NavController) {
  }

  cadastrolinha(){
    this.navCtrl.setRoot( CadLinhaPage );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
