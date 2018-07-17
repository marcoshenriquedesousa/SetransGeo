import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadVeiculoPage } from './cad-veiculo';

@NgModule({
  declarations: [
    CadVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadVeiculoPage),
  ],
})
export class CadVeiculoPageModule {}
