import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';


@IonicPage()
@Component({
  selector: 'page-cad-veiculo',
  templateUrl: 'cad-veiculo.html',
})
export class CadVeiculoPage {
  formatoFormulario: FormGroup;
  empresa: number;
  placa: string;
  numero: number;
  descricao: string;
  ativo: number;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
  ) {
    this.formatoFormulario = this.formBuilder.group({
      empresa:['', [Validators.required, Validators.minLength(3)]],
      placa: ['', [Validators.required, Validators.minLength(7)]],
      numero: ['', [Validators.required, Validators.minLength(6)]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      ativo: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadVeiculosPage');
  }

  cadastrar(){
    // console.log(this.empresa);
    // console.log(this.placa);
    // console.log(this.numero);
    // console.log(this.descricao);
    // console.log(this.ativo);
    
    let onibus = {
      empresa: this.empresa,
      placa: this.placa,
      numero: this.numero,
      descricao: this.descricao,
      ativo: this.ativo
    };

    console.log(onibus);
    
    this.http.post("http://localhost/api_setrans/index.php" + "/cadastrarVeiculos", onibus).subscribe( (respostaDoservidor) => {
      console.log("Cadastro Feito com Sucesso" );
      console.log(respostaDoservidor);
      
    },erro => { 
      console.log("Erro Cadastrar Veiculos");
    }); 
  }
  
}

