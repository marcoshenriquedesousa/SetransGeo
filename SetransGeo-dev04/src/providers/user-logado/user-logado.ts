import { AllVeiculosPage } from './../../pages/all-veiculos/all-veiculos';
import { HomePage } from './../../pages/home/home';

import { Injectable, Component } from '@angular/core';

import { Observable } from 'rxjs';
@Injectable()
export class UserLogadoProvider {
  
  administrator : boolean = false;
  setrans : boolean = false;
  empresa : boolean = false;
  
  constructor() {
    console.log('Hello UserLogadoProvider Provider');
  }


  setPremissoesAdmin(  ){
    this.administrator = true;
    this.setrans = true;
    this.empresa = true;
  }

  setPremissoesSetrans(  ){   
    this.administrator = true; 
    this.empresa = true;
    this.setrans = true;
  }
  
  setPremissoesEmpresa(  ){
    
    this.empresa = true;
    this.setrans = true;
  }

getAdministrator(){
  return this.administrator ? true : false;
}


getSetrans(){
return this.setrans ? true : false;
}


getEmpresa(){
return this.empresa ? true : false;
}

sair(){
  this.administrator = false;
    this.setrans = false;
    this.empresa = false;
}


verQualOTipoDeUsuario( str : string ) : any {

  if ( str.match(/administrator/) ) {
    // alert('administrator');
    this.setPremissoesAdmin();
    // spinner.dismiss();
    // this.navCtrl.setRoot(MenuPage , { page : AllVeiculosPage } );
    return AllVeiculosPage;
  } 
  else if ( str.match(/setrans/) ) {
    // alert('setrans');
    this.setPremissoesSetrans();
    // spinner.dismiss();
    // this.navCtrl.setRoot(MenuPage  , { page : AllVeiculosPage } );
    return AllVeiculosPage;
  }
  else if ( str.match(/empresa/) ) {
    // alert('empresa');
    this.setPremissoesEmpresa();
    // spinner.dismiss();
    // this.navCtrl.setRoot(MenuPage , { page : HomePage } );
    return HomePage;
  } else {
    return "Capabilities não encontrado";
    
  }

}

}
