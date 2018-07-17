import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadLinhaPage } from './cad-linha';

@NgModule({
  declarations: [
    CadLinhaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadLinhaPage),
  ],
})
export class CadLinhaPageModule {}
