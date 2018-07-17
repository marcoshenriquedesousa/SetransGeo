import { OnibusProvider } from './../../providers/onibus/onibus';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var google;

@IonicPage()
@Component({
  selector: 'page-veiculos-empresa',
  templateUrl: 'veiculos-empresa.html',
})
export class VeiculosEmpresaPage {

  
  childNavCtrl: any;
  // npm run prod
  // ionic run build --prod

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  onibus = Array();
  marcadoresOnibus = [];
  arrayLinhas = [];
  
  blueCoords;
  redCoords;

  select: any;


  //LINHAS
  //IDA
  flightPath1;
  //VOLTA
  flightPath2;


  // url = 'http://www.cloudi.com.br/buson/buson-servidor/api/index.php/historico?lastUpdate=true';
  // url = 'http://www.buson.com.br/api/index.php/historico?lastUpdate=true';
  // url = 'http://localhost/homologacao/index.php/historico?lastUpdate=true';

  
  // urlLinhas = 'http://localhost/homologacao/index.php/linha';
  
  urlLinhas = 'http://buson.com.br/homologacao/api_setrans/index.php/empresas';
  urlOnibusEmoresa = "http://buson.com.br/homologacao/api_setrans/index.php/setransAllOnibus?codEmpresa=";

  constructor(
    private onibusServe : OnibusProvider,
    public alertCtrl : AlertController, 
    public http: Http,
    public navCtrl: NavController, public navParams: NavParams) {

    
    this.http.get(this.urlLinhas)
    .map( res => {
      console.log(res.json());
      this.arrayLinhas = res.json();
       
    }).toPromise()
    .then( ()  => { console.log( "get empresa ok" ) } )
    .catch( ()  => console.log( "get empresa error" ) );

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  ionViewDidLeave(){
    this.pararAtualizacao();
    console.log("saindo todos os veiculos empres ionViewDidLeave");
    clearInterval(this.loopExibirOnibus);
  }

  ionViewWillUnload():void {
    this.pararAtualizacao();
    console.log("saindo todos os veiculos empres ionViewWillUnload");
    clearInterval(this.loopExibirOnibus);
  }

  ionViewWillLeave(){
    this.pararAtualizacao();
    console.log("saindo todos os veiculos empres ionViewWillLeave");
    clearInterval(this.loopExibirOnibus);
  }


  loadMap(){
 
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

  showSelectValue( codigoLinha, event){
    console.log("select");
    console.log(this.select);
    this.localizarTodosOsOnibusEmpresa();
  }
  
  loopExibirOnibus;

  localizarTodosOsOnibusEmpresa() {
    console.log("localizarTodosOsOnibusEmpresa");
    this.loopExibirOnibus = setInterval(() => {
      this.limparBus();
      console.log("atializar");

      let posicaoOnibus;
      this.http.get(this.urlOnibusEmoresa + this.select)
        .map(res => {
          // console.log(res.json());
          if (res.json().length > 0) {
            // console.log(res.json()[0].i);
            this.onibus = res.json();
            for (let index = 0; index < this.onibus.length; index++) {
              console.log("debug");
              // console.log(this.onibus[index].s);

              let icon;

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

              posicaoOnibus = new google.maps.LatLng(res.json()[index].Latitude, res.json()[index].Longitude);

              this.marcadoresOnibus.push(
                new google.maps.Marker({
                  map: this.map,
                  // animation: google.maps.Animation.DROP,
                  position: posicaoOnibus,
                  // icon: icon,
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
              title: 'Nenhum ônibus ativo',
              subTitle: 'Tente outra linha',
              buttons: ['OK']
            }).present();
            this.pararAtualizacao();
          }
        }).toPromise()
        .then(() => console.log("set ok"))
        .catch(() => console.log("erro set"));
    }, 10000);
  }

  limparBus() {
    console.log("limapr bus");
    // this.marcadoresOnibus.setMap(null);            
    // vare o array com as paradas e vai apagando uma por uma
    this.marcadoresOnibus.forEach(function (marker) {
      marker.setMap(null);
    });
    //debug
    console.log("limpar paradas");
    this.marcadoresOnibus = Array();
  }

  pararAtualizacao() {
    console.log("set interval stop");
    clearInterval(this.loopExibirOnibus);
  }// fim pararAtualizacao

}
