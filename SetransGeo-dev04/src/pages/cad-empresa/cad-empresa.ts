import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-cad-empresa',
  templateUrl: 'cad-empresa.html',
})
export class CadEmpresaPage {
  razao: string;
  fantasia: string;
  cnpj: number;
  endereco: string;
  telefone: number;
  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadEmpresaPage');
  }

  cadastrar(){
    // console.log(this.empresa);
    // console.log(this.placa);
    // console.log(this.numero);
    // console.log(this.descricao);
    // console.log(this.ativo);
    
    let empresa = {
      razao: this.razao,
      fantasia: this.fantasia,
      cnpj: this.cnpj,
      endereco: this.endereco,
      telefone: this.telefone,
      email: this.email
    };

    console.log(empresa);
    
    this.http.post("http://buson.com.br/homologacao/api_setrans/index.php/add_empresa", empresa).subscribe( (respostaDoservidor) => {
      console.log("Cadastro Feito com Sucesso" );
      console.log(respostaDoservidor);
      
    },erro => { 
      console.log("Erro Cadastrar Veiculos");
    }); 
  }

}
