import { StorageServeProvider } from './../../providers/storage-serve/storage-serve';
import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { AllVeiculosPage } from './../all-veiculos/all-veiculos';
import { MenuPage } from './../menu/menu';
import { UserLogadoProvider } from './../../providers/user-logado/user-logado';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Menu, LoadingController, AlertController } from 'ionic-angular';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username;
  password;

  api_url = 'http://localhost/token/token/wp-json/jwt-auth/v1/token';

  constructor(
    private storageServe : StorageServeProvider,
    private loginService : LoginServiceProvider,
    public alertCtrl : AlertController,
    public storage : Storage,
    public loadingCtrl: LoadingController,
    private userLogado : UserLogadoProvider,
    public http : Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    
     // spinner 
     let spinner = this.loadingCtrl.create({
      content: ''
    });
    

    spinner.present();
    
    

      this.loginService.login(this.username , this.password)
    .subscribe((res) => {
        
        let response = res.json();

        if(response.error){
          spinner.dismiss();
            alert("login ou senha invalidos");
        }  else {

        this.storageServe.salvarTokenUsuario( response )
        .then( (data) => { console.log("token Salvo") })
        .catch( (erro) => { 
          console.log(erro);
          console.log("Erro ao salvar o token");          
         });

        
        let dados = JSON.stringify(res.json().user.capabilities);
        
        // configura o menu conforme o tipo de usuario 
        let tipoDeUsuario = this.userLogado.verQualOTipoDeUsuario( dados );

        
        this.navCtrl.setRoot(MenuPage , { page : tipoDeUsuario } )
           .then( () => { spinner.dismiss();  })
           .catch( () => { spinner.dismiss();  
            // console.log( tipoDeUsuario);
           }
           );
        
        
        } // fim else 

      } , erro => { console.log("Erro get Login Serve");
       });
 
      } // fim login


      Spinner() {
            
        // spinner 
        let spinner = this.loadingCtrl.create({
          content: ''
        });
        // chama o spinner
        return spinner;

      } // fim spinner

}
  