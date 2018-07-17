import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PopoverPage } from '../popover/popover';
import { CadVeiculoPage } from '../cad-veiculo/cad-veiculo';

@IonicPage()

@Component({
  selector: 'page-list-veiculo',
  templateUrl: 'list-veiculo.html',
})
export class ListVeiculoPage {
  public veiculo : any[];
  veiculos: any;


  public empresa = {};
  empresas: any;

  constructor(
    public popoverCtrl: PopoverController,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public navController: NavController
  ) {
    
    //recebe o código
    let codi = navParams.get('codigoURL');
    console.log(codi);
    
    //pega os veículos da empresa
    this.http.get('http://buson.com.br/homologacao/api_setrans/index.php/get_veiculo?codVeiculo=' + codi)
      .map(respostaServidor => {

        this.veiculo = respostaServidor.json();
        console.log(this.veiculo);
        this.initializeItems();

      }).toPromise()
      .then(() => {
        console.log("Veiculos ok");

      }).catch(() => {
        console.log("Erro ao pegar os Veiculos no servidor");
      });


    //pega o nome da empresa selecionada
    this.http.get('http://buson.com.br/homologacao/api_setrans/index.php/uma_empresa?codEmpresa=' + codi)
      .map(respostaServidor => {

        this.empresas = respostaServidor.json();
        console.log(this.empresas);

      }).toPromise()
      .then(() => {
        console.log("Empresa ok");

      }).catch(() => {
        console.log("Erro ao pegar os Empresa no servidor");
      });
  }

  presentPopover(myEvent, codi) {
    let popover = this.popoverCtrl.create(PopoverPage, { pageInfo: "InfoVeiculoPage", pageEdit: "EditVeiculoPage", codigo: codi });
    popover.present({
      ev: myEvent
    });
    console.log("OK");
  }

  initializeItems() {

    this.veiculos = this.veiculo;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.veiculos = this.veiculos.filter((item) => {
        return (item.Numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  cadastroveiculo() {
    this.navController.push(CadVeiculoPage);
  }

  funcaobusca(event: any): void {
    let pesquisa: string = event.target.value;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListVeiculoPage');

  }

}
