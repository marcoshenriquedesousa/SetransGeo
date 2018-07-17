import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PopoverPage } from '../popover/popover';
import { CadEmpresaPage } from './../cad-empresa/cad-empresa';

@IonicPage()
@Component({
  selector: 'page-list-empresa',
  templateUrl: 'list-empresa.html',
  
})
export class ListEmpresaPage {
  public empresa = {} ;
  empresas: any;

  constructor(
    public popoverCtrl: PopoverController,
    public http: Http,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public navController: NavController
  ) {

       this.http.get( 'http://buson.com.br/homologacao/api_setrans/index.php/empresas'  )
       .map( respostaServidor => {

         this.empresas = respostaServidor.json();
         console.log( this.empresas);
         
       } ).toPromise()
       .then( ()=> {
         console.log("Empresas ok");
         
       } ).catch( ()=>{
         console.log("Erro ao pegar as empresas no servidor");
       } );
       
      }

      presentPopover(myEvent, codigoURL) {
        let popover = this.popoverCtrl.create(PopoverPage, {pageInfo: "InfoEmpresaPage", pageEdit: "EditEmpresaPage",codlinha: codigoURL});
        popover.present({
            ev: myEvent
          });
          console.log("OK");
      }

      cadastroempresa(){
        this.navController.push(CadEmpresaPage);
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEmpresaPage');
  }

}
