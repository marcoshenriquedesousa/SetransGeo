import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListVeiculoPage } from './list-veiculo';

@NgModule({
  declarations: [
    ListVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListVeiculoPage),
  ],
})
export class ListVeiculoPageModule {}
