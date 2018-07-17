import { NgModule } from '@angular/core';

// informa que deve carregar apenas um pedaço
import { IonicPageModule } from 'ionic-angular';

// pagina para o carregamento preguiçoso
import { MenuPage } from './menu';


@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  exports: [
    MenuPage
  ]
})
export class MenuPageModule {}
