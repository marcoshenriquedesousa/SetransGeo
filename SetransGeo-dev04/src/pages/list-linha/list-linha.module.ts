import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLinhaPage } from './list-linha';

@NgModule({
  declarations: [
    ListLinhaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListLinhaPage),
  ],
})
export class ListLinhaPageModule {}
