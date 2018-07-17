import { EmpresaVeiculoPage } from './../empresa-veiculo/empresa-veiculo';
import { ListLinhaPage } from './../list-linha/list-linha';
import { HomeSetransPage } from './../home-setrans/home-setrans';
import { EmpresaLinhaPage } from './../empresa-linha/empresa-linha';
import { ListEmpresaPage } from './../list-empresa/list-empresa';
import { LoginPage } from './../login/login';
import { UserLogadoProvider } from './../../providers/user-logado/user-logado';
import { VeiculosLinhaPage } from './../veiculos-linha/veiculos-linha';
import { VeiculosEmpresaPage } from './../veiculos-empresa/veiculos-empresa';
import { AllVeiculosPage } from './../all-veiculos/all-veiculos';
import { ListPage } from './../list/list';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from './../home/home';
import {Storage} from '@ionic/storage';
import { StorageServeProvider } from '../../providers/storage-serve/storage-serve';
import { InfoLinhaPage } from '../info-linha/info-linha';

@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  statusAdmin: boolean = false;
  statusSetrans: boolean = false;
  statysEmpresa: boolean = false;

  pages: Array<{ title: string, component: any, status: boolean }>;

  homePage: any;
  categorias = [];

  @ViewChild('content') childNavCtrl: NavController;

  loggedIn: boolean;
  user: any;

  // used for an example of ngFor and navigation

  constructor(
    private storageServe : StorageServeProvider,
    public storage : Storage ,
    private userLogado: UserLogadoProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {

      this.statusAdmin = this.userLogado.getAdministrator()
      this.statusSetrans = this.userLogado.getSetrans();
      this.statysEmpresa = this.userLogado.getEmpresa();

    // this.homePage = HomePage;
    this.homePage = this.navParams.get("page");
    this.user = {};

    this.pages = [
      { title: 'Home', component: HomePage, status: true },
      { title: 'List', component: ListPage, status: true },
      { title: 'Listar Linhas da Empresa', component: ListLinhaPage, status: true },
      { title: 'List', component: ListPage, status: true },
      { title: 'Informçãoes da Linha', component: InfoLinhaPage, status: true },
      { title: 'Tela Inicial', component: HomeSetransPage, status: this.userLogado.getAdministrator() },
      { title: 'Veículos Empresa', component: VeiculosEmpresaPage, status: this.userLogado.getSetrans() },
      { title: 'Veículos Linha', component: VeiculosLinhaPage, status: this.userLogado.getEmpresa() }
    ];
  }

  ionViewDidEnter() {
    this.storage.ready()
    .then( () => {
      this.storage.get("userLoginInfo")
        .then( (userLoginInfo) => {
          if(userLoginInfo != null){
            console.log("User logged in...");
            this.user = userLoginInfo;
            console.log(this.user);
            this.loggedIn = true;
            
          } else {
            console.log("token = null");
            this.user = {};
            this.loggedIn = false;
            
          }
        } ) 
    });

  }
  
  allOnibus(){
    this.childNavCtrl.setRoot( HomeSetransPage );
  }

  empresa(){
    this.childNavCtrl.setRoot( ListEmpresaPage );
  }

  linha(){
    this.childNavCtrl.setRoot( EmpresaLinhaPage );
  }

  veiculo(){
    this.childNavCtrl.setRoot( EmpresaVeiculoPage );
  }

  sair(){
    this.storageServe.removerTokenUsuario()
    .then(() => {
      console.log("Token apagado");      
      this.user = {};
      this.loggedIn = false;
      this.userLogado.sair();
      this.navCtrl.setRoot(LoginPage);
    }).catch( () => console.log("Erro remover token")
     );
    
  }

}
