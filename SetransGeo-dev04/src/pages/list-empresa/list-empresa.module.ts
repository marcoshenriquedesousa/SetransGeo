import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEmpresaPage } from './list-empresa';

@NgModule({
  declarations: [
    ListEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEmpresaPage),
  ],
})
export class ListEmpresaPageModule {}
