import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllVeiculosPage } from './all-veiculos';

@NgModule({
  declarations: [
    AllVeiculosPage,
  ],
  imports: [
    IonicPageModule.forChild(AllVeiculosPage),
  ],
})
export class AllVeiculosPageModule {}
