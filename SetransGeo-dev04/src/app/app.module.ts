import { EmpresaVeiculoPage } from './../pages/empresa-veiculo/empresa-veiculo';
import { EditLinhaPage } from './../pages/edit-linha/edit-linha';
import { EditEmpresaPage } from './../pages/edit-empresa/edit-empresa';
import { InfoVeiculoPage } from './../pages/info-veiculo/info-veiculo';
import { ListVeiculoPage } from './../pages/list-veiculo/list-veiculo';
import { ListLinhaPage } from './../pages/list-linha/list-linha';
import { PopoverPage } from './../pages/popover/popover';
import { MenuPage } from './../pages/menu/menu';
import { LoginPage } from './../pages/login/login';
import { VeiculosLinhaPage } from './../pages/veiculos-linha/veiculos-linha';
import { VeiculosEmpresaPage } from './../pages/veiculos-empresa/veiculos-empresa';
import { CadEmpresaPage } from './../pages/cad-empresa/cad-empresa';
import { CadLinhaPage } from './../pages/cad-linha/cad-linha';
import { CadastroPage } from './../pages/cadastro/cadastro';

import { AllVeiculosPage } from './../pages/all-veiculos/all-veiculos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//npm install @ionic-native/geolocation --save


//C:\Program Files (x86)\Google\Chrome\Application
// chrome.exe --disable-web-security --user-data-dir="D:\chrome
import { HttpModule } from '@angular/http';
import { UserLogadoProvider } from '../providers/user-logado/user-logado';

import { IonicStorageModule } from '@ionic/storage';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { StorageServeProvider } from '../providers/storage-serve/storage-serve';
import { OnibusProvider } from '../providers/onibus/onibus';
import { ListEmpresaPage } from '../pages/list-empresa/list-empresa';
import { CadVeiculoPage } from '../pages/cad-veiculo/cad-veiculo';
import { InfoLinhaPage } from '../pages/info-linha/info-linha';
import { EditVeiculoPage } from '../pages/edit-veiculo/edit-veiculo';
import { EmpresaLinhaPage } from './../pages/empresa-linha/empresa-linha';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    AllVeiculosPage,
    VeiculosEmpresaPage,
    VeiculosLinhaPage,
    EditLinhaPage,
    EmpresaVeiculoPage,
    EmpresaLinhaPage,
    MenuPage,
    CadEmpresaPage,
    CadLinhaPage,
    CadastroPage,
    CadVeiculoPage,
    ListEmpresaPage,
    PopoverPage,
    InfoLinhaPage,
    ListVeiculoPage,
    ListPage,
    ListLinhaPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    AllVeiculosPage,
    EditLinhaPage,
    EmpresaVeiculoPage,
    EmpresaLinhaPage,
    VeiculosEmpresaPage,
    VeiculosLinhaPage,
    MenuPage,
    CadEmpresaPage,
    CadLinhaPage,
    CadastroPage,
    CadVeiculoPage,
    ListEmpresaPage,
    PopoverPage,
    ListVeiculoPage,
    InfoLinhaPage,
    ListPage,
    ListLinhaPage
  ],
  providers: [
    StatusBar,

    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserLogadoProvider,
    LoginServiceProvider,
    StorageServeProvider,
    OnibusProvider
  ]
})
export class AppModule { }
