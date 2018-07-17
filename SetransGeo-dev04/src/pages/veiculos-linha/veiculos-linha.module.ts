import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculosLinhaPage } from './veiculos-linha';

@NgModule({
  declarations: [
    VeiculosLinhaPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculosLinhaPage),
  ],
})
export class VeiculosLinhaPageModule {}
