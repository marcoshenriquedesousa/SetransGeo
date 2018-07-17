import { CadLinhaPage } from './../cad-linha/cad-linha';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PopoverPage } from '../popover/popover';

@IonicPage()

@Component({
  selector: 'page-list-linha',
  templateUrl: 'list-linha.html',
})
export class ListLinhaPage {
  public linha = {} ;
  linhas: any;

  constructor(
    public popoverCtrl: PopoverController,
    public http: Http,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public navController: NavController
  ) {

    //recebe o código
    let codigoURL = navParams.get('codigoURL');
    
    this.http.get( 'http://buson.com.br/homologacao/api_setrans/index.php/get_empresa?codEmpresa=' + codigoURL  )
    .map( respostaServidor => {

      this.linhas = respostaServidor.json();
      console.log( this.linhas);
      
    } ).toPromise()
    .then( ()=> {
      console.log("Linhas ok");
      
    } ).catch( ()=>{
      console.log("Erro ao pegar as linhas no servidor");
    } );
  }

  presentPopover(myEvent, codigoURL) {
    let popover = this.popoverCtrl.create(PopoverPage, {pageInfo: "InfoLinhaPage", pageEdit: "EditLinhaPage",codigo: codigoURL});
    popover.present({
        ev: myEvent
      });
      console.log("OK");
  }

  cadastrolinha(){
    this.navController.push( CadLinhaPage );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLinhaPage');
  }

}
