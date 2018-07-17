import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVeiculoPage } from './edit-veiculo';

@NgModule({
  declarations: [
    EditVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditVeiculoPage),
  ],
})
export class EditVeiculoPageModule {}
