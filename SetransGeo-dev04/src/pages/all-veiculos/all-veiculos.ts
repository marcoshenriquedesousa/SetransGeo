import { OnibusProvider } from './../../providers/onibus/onibus';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';




declare var google;



@IonicPage()
@Component({
  selector: 'page-all-veiculos',
  templateUrl: 'all-veiculos.html',
})
export class AllVeiculosPage {

  urlAllOnibus = 'http://buson.com.br/homologacao/api_setrans/index.php/setransAllOnibus';

  // config para exibir o mapa
  @ViewChild('map') mapElement: ElementRef;
  map: any;


  marcadoresOnibus = [];
  onibus = Array();


  constructor(

    private onibusServe : OnibusProvider,
    public alertCtrl: AlertController,
    
    public http: Http,
    public navCtrl: NavController, public navParams: NavParams) {
    
        this.localizarTodosOsOnibus();

  }

  
  // esses 3 métodos são necessarios para parar a atualização automatica.
  // se remotivodos, quando sair para outra  página o loop não irá parar de ser executar
  ionViewDidLeave(){
    this.pararAtualizacao();
    console.log("saindo todos os veiculos ionViewDidLeave");
    clearInterval(this.loopExibirOnibus);
  }

  ionViewWillUnload():void {
    this.pararAtualizacao();
    console.log("saindo todos os veiculos ionViewWillUnload");
    clearInterval(this.loopExibirOnibus);
  }

  ionViewWillLeave(){
    this.pararAtualizacao();
    console.log("saindo todos os veiculos ionViewWillLeave");
    clearInterval(this.loopExibirOnibus);
  }
  


  ionViewDidLoad() {    
    // chama o método com as config do map 
    this.loadMap();
  }
  
  // configura os parâmetros necessários do mapa antes da página ser exibida 
  loadMap() {

    let latLng = new google.maps.LatLng(-2.425891, -54.728845);

    let mapOptions = {
      center: latLng,
      zoom: 14,
      streetViewControl: false,
      // disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // mapTypeControl : false
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  loopExibirOnibus;

  localizarTodosOsOnibus() {
    console.log("localizarTodosOsOnibus");

    this.loopExibirOnibus = setInterval(() => {

      this.limparOnibus();

      let posicaoOnibus;

      this.http.get(this.urlAllOnibus)
        .map(res => {

          if (res.json().length > 0) {


            this.onibus = res.json();

            for (let index = 0; index < this.onibus.length; index++) {

              // this.icone();
  
              posicaoOnibus = new google.maps.LatLng( this.onibus[index].Latitude,  this.onibus[index].Longitude);

              this.marcadoresOnibus.push(
                new google.maps.Marker({
                  map: this.map,
                  // animation: google.maps.Animation.DROP,
                  position: posicaoOnibus,
                  icon: './assets/imgs/bus.png',
                  draggable: false,
                  // animation: google.maps.Animation.DROP,
                  // <img src="assets/img/logo.jpg">
                })
              );
            }// fim for , add marcadores ônibus



            this.onibusServe.MensagemTempoColetaOnibus( this.marcadoresOnibus , this.onibus, google );


            
          } else {

            this.pararAtualizacao();
            this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Tente outra linha',
              buttons: ['OK']
            }).present();

            this.pararAtualizacao();

          }
        }).toPromise()
        .then(() => console.log("get allOnibus ok"))
        .catch(() => console.log("erro get allOnibus"));

    }, 10000);
  }



  limparOnibus() {
    console.log("limapr bus");
    // vare o array com as paradas e vai apagando uma por uma
    this.marcadoresOnibus.forEach(function (marker) {
      marker.setMap(null);
    });

    this.marcadoresOnibus = Array();

  } // fim limparOnibus

  pararAtualizacao() {
    console.log("set interval stop");
    clearInterval(this.loopExibirOnibus);

  }// fim pararAtualizacao



  icone(){
      // if(
              //   this.onibus[index].y != 0 ||
              //   this.onibus[index].m != 0 ||
              //   this.onibus[index].d != 0 ||
              //   this.onibus[index].h != 0 || 
              //   this.onibus[index].i > 5
              // ) {
              //  icon = 'assets/imgs/busDesatualizado.png';
              // } else {
              //   icon  = 'assets/imgs/bus.png';
              // }
  }

}
