import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmpresaPage } from './edit-empresa';

@NgModule({
  declarations: [
    EditEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmpresaPage),
  ],
})
export class EditEmpresaPageModule {}
