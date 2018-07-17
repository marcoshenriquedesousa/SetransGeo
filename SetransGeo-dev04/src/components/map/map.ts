import { Component, ElementRef, ViewChild } from '@angular/core';

import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {

  // config para exibir o mapa
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  

  constructor() {
   
  }

  ionViewDidLoad() {

    // chama o método com as config do map 
    this.loadMap();
  }
  
  loadMap() {
  
    // ponto central do map
    let latLng = new google.maps.LatLng(-2.425891, -54.728845);
  
    // config map
    let mapOptions = {
      center: latLng,
      zoom: 14,
      streetViewControl: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    }
  
    // exibe o map
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
  }
}
