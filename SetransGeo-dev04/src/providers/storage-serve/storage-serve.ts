import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage';
@Injectable()
export class StorageServeProvider {

  constructor(  public storage : Storage ) {
    console.log('Hello StorageServeProvider Provider');
  }


  salvarTokenUsuario( tokenUser ) : Promise<any> {
    return  this.storage.set("tokenUser" , tokenUser );
  }

  removerTokenUsuario() : Promise<any> {
    return this.storage.remove("tokenUser");
  }


}
