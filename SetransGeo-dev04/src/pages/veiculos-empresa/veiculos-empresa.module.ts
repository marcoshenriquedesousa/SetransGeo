import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculosEmpresaPage } from './veiculos-empresa';

@NgModule({
  declarations: [
    VeiculosEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculosEmpresaPage),
  ],
})
export class VeiculosEmpresaPageModule {}
