import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-info-veiculo',
  templateUrl: 'info-veiculo.html',
})
export class InfoVeiculoPage {

  veiculos: any;

  constructor(
    public http: Http,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    {
    //recebe o código
    let codi = navParams.get('codigo');
    console.log(codi);
    
    
    //pega os veículos da empresa
    this.http.get( 'http://buson.com.br/homologacao/api_setrans/index.php/get_veiculo?codVeiculo=' + codi)
    .map( respostaServidor => {

      this.veiculos = respostaServidor.json();
      console.log( this.veiculos);
      
    } ).toPromise()
    .then( ()=> {
      console.log("Veiculo ok");
      
    } ).catch( ()=>{
      console.log("Erro ao pegar os Veiculos no servidor");
    } );
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoVeiculoPage');
  }

}
