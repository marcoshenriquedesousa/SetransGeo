import { ListVeiculoPage } from './../list-veiculo/list-veiculo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-empresa-veiculo',
  templateUrl: 'empresa-veiculo.html',
})
export class EmpresaVeiculoPage {
  public empresa = {} ;
  empresas: any;

  constructor(
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

      pushPage(CodigoEmp) {
        this.navCtrl.push(ListVeiculoPage, {codigoURL: CodigoEmp});
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaVeiculoPage');
  }

}
