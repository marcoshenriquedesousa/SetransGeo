import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info-linha',
  templateUrl: 'info-linha.html',
})
export class InfoLinhaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("O codigo escolhi foi : ");
    console.log(   this.navParams.get('CodLinha'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoLinhaPage');
  }

}
