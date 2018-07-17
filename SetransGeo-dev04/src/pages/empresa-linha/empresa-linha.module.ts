import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaLinhaPage } from './empresa-linha';

@NgModule({
  declarations: [
    EmpresaLinhaPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaLinhaPage),
  ],
})
export class EmpresaLinhaPageModule {}
