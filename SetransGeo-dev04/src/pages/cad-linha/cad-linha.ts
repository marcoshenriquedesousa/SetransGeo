import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-cad-linha',
  templateUrl: 'cad-linha.html',
})
export class CadLinhaPage {
  arrayLinhas = [];
  select: number;
  descricao: string;

  urlLinhas = 'http://buson.com.br/homologacao/api_setrans/index.php/empresas';

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    public navCtrl: NavController, public navParams: NavParams
  ) {

    this.http.get(this.urlLinhas)
    .map( res => {
      console.log(res.json());
      this.arrayLinhas = res.json();
       
    }).toPromise()
    .then( ()  => { console.log( "get empresa ok" ) } )
    .catch( ()  => console.log( "get empresa error" ) );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadLinhaPage');
  }

  showSelectValue( codigoLinha, event){
    console.log("select");
    console.log(this.select);
    console.info("Selected:",this.select);
  }

  cadastrar(){
    // console.log(this.empresa);
    // console.log(this.placa);
    // console.log(this.numero);
    // console.log(this.descricao);
    // console.log(this.ativo);
    
    let linha = {
      select: this.select,
      descricao: this.descricao
    };

    console.log(linha);
    
    this.http.post("http://buson.com.br/homologacao/api_setrans/index.php/add_linha", linha).subscribe( (respostaDoservidor) => {
      console.log("Cadastro Feito com Sucesso" );
      console.log(respostaDoservidor);
      
    },erro => { 
      console.log("Erro Cadastrar Linha");
    }); 
  }

}
