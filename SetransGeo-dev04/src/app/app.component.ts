import { EditVeiculoPage } from './../pages/edit-veiculo/edit-veiculo';
import { CadVeiculoPage } from './../pages/cad-veiculo/cad-veiculo';
import { ListVeiculoPage } from './../pages/list-veiculo/list-veiculo';
import { UserLogadoProvider } from './../providers/user-logado/user-logado';
import { LoginPage } from './../pages/login/login';
import { VeiculosLinhaPage } from './../pages/veiculos-linha/veiculos-linha';
import { VeiculosEmpresaPage } from './../pages/veiculos-empresa/veiculos-empresa';
import { AllVeiculosPage } from './../pages/all-veiculos/all-veiculos';
import { CadEmpresaPage } from './../pages/cad-empresa/cad-empresa';
import { CadLinhaPage } from './../pages/cad-linha/cad-linha';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Menu } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MenuPage } from './../pages/menu/menu';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any , status : boolean}>;

  constructor(
    private userLogado : UserLogadoProvider,
    public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage , status : true },
      { title: 'List', component: ListPage , status : true },
      { title: 'Todos os Veículos', component: AllVeiculosPage  , status : this.userLogado.getAdministrator() },
      { title: 'Veículos Empresa', component: VeiculosEmpresaPage , status : this.userLogado.getSetrans() },
      { title: 'Veículos Linha', component: VeiculosLinhaPage , status : this.userLogado.getEmpresa() }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
