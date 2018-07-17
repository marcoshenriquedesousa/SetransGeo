import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-edit-veiculo',
  templateUrl: 'edit-veiculo.html',
})
export class EditVeiculoPage {

  empresa: number;
  placa: string;
  numero: number;
  descricao: string;
  codigo: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
  ) {
    
    let codi = navParams.get('codigo');
    this.codigo = codi;
    console.log(codi);
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadVeiculosPage');
  }

  cadastrar(){

    //recebe o código
    let onibus = {
      empresa: this.empresa,
      placa: this.placa,
      numero: this.numero,
      descricao: this.descricao,
      codigo: this.codigo
    };

    console.log(onibus);
    
    this.http.put("http://localhost/api_setrans/index.php" + "/veiculo", onibus).subscribe( (respostaDoservidor) => {
      console.log("Alteração feita com sucesso" );
      console.log(respostaDoservidor);
      
    },erro => { 
      console.log("Erro ao alterar Veiculo");
    }); 
  }

}
