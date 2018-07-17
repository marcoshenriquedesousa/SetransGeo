import { OnibusProvider } from './../../providers/onibus/onibus';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var google;

@IonicPage()
@Component({
  selector: 'page-veiculos-linha',
  templateUrl: 'veiculos-linha.html',
})
export class VeiculosLinhaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  onibus = Array();
  marcadoresOnibus = [];
  arrayLinhas = [];

  ponto: { lat: number, lng: number };


  arrayRotaIda: any = [];
  arrayRotaVolta: any = [];


  ida = [{}];
  volta = [{}];
  blueCoords;
  redCoords;

  select: any;
  status: boolean = false;
  //LINHAS
  //IDA
  flightPath1;
  //VOLTA
  flightPath2;


  // url = 'http://www.cloudi.com.br/buson/buson-servidor/api/index.php/historico?lastUpdate=true';
  // url = 'http://www.buson.com.br/api/index.php/historico?lastUpdate=true';
  // url = 'http://localhost/homologacao/index.php/historico?lastUpdate=true';

  urlLinha = 'http://buson.com.br/homologacao/api_setrans/index.php/setransLinha?codLinha=';
  // urlLinhas = 'http://localhost/homologacao/index.php/linha';
  urlLinhas = 'http://buson.com.br/homologacao/api_setrans/index.php/linha?ativo=1';

  urlRotaIda = "http://buson.com.br/homologacao/api_setrans/index.php/setransRotaIda?codLinha=";
  urlRotaVolta = "http://buson.com.br/homologacao/api_setrans/index.php/setransRotaVolta?codLinha=";

  constructor(
    private onibusServe : OnibusProvider,
    public alertCtrl: AlertController,
    public http: Http,
    public navCtrl: NavController, public navParams: NavParams) {

      this.status = false;

    this.http.get(this.urlLinhas)
      .map(res => {
        // console.log(res.json());
        this.arrayLinhas = res.json();

        for (let index = 0; index < res.json(); index++) {
          console.log(index);

        }

      }).toPromise()
      .then(() => {
        console.log("get linhas ok")


      })
      .catch(() => console.log("get linhas error"));

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  ionViewDidLeave() {
    this.pararAtualizacao();
    console.log("saindo todos os veiculos linha ionViewDidLeave");
    clearInterval(this.loopExibirOnibus);
  }

  ionViewWillUnload(): void {
    this.pararAtualizacao();
    console.log("saindo todos os veiculos linha ionViewWillUnload");
    clearInterval(this.loopExibirOnibus);
  }

  ionViewWillLeave() {
    this.pararAtualizacao();
    console.log("saindo todos os veiculos linha ionViewWillLeave");
    clearInterval(this.loopExibirOnibus);
  }


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

  showSelectValue(codigoLinha, event) {

    
    this.ida = [{}];
    this.volta = [{}];
    this.arrayRotaIda = [];
    this.arrayRotaVolta = [];

    console.log("select");
    console.log(this.select);

    this.localizarTodosOsOnibusLinha();


    // pega a rota de ida
    this.http.get("http://buson.com.br/homologacao/api_setrans/index.php/setransRotaIda?codLinha=" + this.select)
      .map(res => {

        // console.log("tamhnho");
        // console.log(res.json());

        this.arrayRotaIda = res.json();

        this.arrayRotaIda.forEach(element => {
          //  console.log(element);

          this.ponto = { lat: parseFloat(element.lat), lng: parseFloat(element.lng) };
          this.ida.push(this.ponto);

        });

        this.ida.splice(0, 1);
        // console.log(this.ida);

        this.criarRota();

        //

        this.http.get("http://buson.com.br/homologacao/api_setrans/index.php/setransRotaVolta?codLinha=" + this.select)
        .map(res => {
  
          // console.log("tamhnho");
          // console.log(res.json());
  
          this.arrayRotaVolta = res.json();
  
          this.arrayRotaVolta.forEach(element => {
            //  console.log(element);
  
            this.ponto = { lat: parseFloat(element.lat), lng: parseFloat(element.lng) };
            this.volta.push(this.ponto);
  
          });
  
          this.volta.splice(0, 1);
          // console.log(this.ida);
  
          this.criarRota();
  
          // this.criarRota(); 
        }).toPromise()
        .then(() => {
          console.log("get rota ida ok");
        }).catch(() => console.log("get rota ida  error"));
  

        //


        // this.criarRota(); 
      }).toPromise()
      .then(() => {
        console.log("get rota ida ok");
      }).catch(() => console.log("get rota ida  error"));



  }// fim showSelectValue



  loopExibirOnibus;


  localizarTodosOsOnibusLinha() {

    console.log("localizarTodosOsOnibusEmpresa");

if( this.status == true ) {
  this.removeLine();
console.log("limpar linha");
} else {
  console.log("Ainda não criou nem uma linha");
  
}

    this.loopExibirOnibus = setInterval(() => {

      this.limparBus();
      console.log("atializar");



      let posicaoOnibus;

      this.http.get(this.urlLinha + this.select)
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

              let bus = {
                resposta: this.onibus,
                // latUlt:res.json()[0].Latitude,
                latUlt: this.onibus[index].Latitude,
                // lonUlt: res.json()[0].Longitude,
                lonUlt: this.onibus[index].Longitude,
                hora: this.onibus[index].DataHora
              };

              console.log(bus);

              posicaoOnibus = new google.maps.LatLng(res.json()[index].Latitude, res.json()[index].Longitude);

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

  public criarRota() {




    if( this.status == false ) {
        this.status = true;      
    } else {
      this.removeLine();
    }

      // this.removeLine();


    // if( this.arrayRotaIda.length > 0 && this.arrayRotaVolta.length > 0 ) {
    console.log("Criar todas as rotas ok");
    // console.log(this.ida);

    
    // config a cor e espessura da linha 
    this.flightPath1 = new google.maps.Polyline({
      path: this.ida,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

  
    this.flightPath2 = new google.maps.Polyline({
      path: this.volta,
      geodesic: true,
      strokeColor: '#0000FF',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    //Exibe a rota
    this.flightPath1.setMap(this.map);
    this.flightPath2.setMap(this.map);

    // } else {
    //   alert("Não foi possivel criar a rota");
    // } 

    // 
    
  

  }

  removeLine() {
    this.flightPath1.setMap(null);
    this.flightPath2.setMap(null);
  }
}
