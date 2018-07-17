import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadEmpresaPage } from './cad-empresa';

@NgModule({
  declarations: [
    CadEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadEmpresaPage),
  ],
})
export class CadEmpresaPageModule {}
