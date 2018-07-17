import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoVeiculoPage } from './info-veiculo';

@NgModule({
  declarations: [
    InfoVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoVeiculoPage),
  ],
})
export class InfoVeiculoPageModule {}
