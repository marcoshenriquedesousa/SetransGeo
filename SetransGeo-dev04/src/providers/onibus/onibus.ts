
import { Injectable } from '@angular/core';

@Injectable()
export class OnibusProvider {

  constructor() {
    console.log('Hello OnibusProvider Provider');
  }

  MensagemTempoColetaOnibus( marcadoresOnibus   , arrayOnibus  , google)  {

    let msg;

    marcadoresOnibus.map((x, i) => {

      let atual = arrayOnibus[i];

      let linha = arrayOnibus[i].LinhaDescricao;
      let nomeEmpresa = arrayOnibus[i].empresaNome;
      let nOnibus = arrayOnibus[i].OnibusNumero;
      // let onibusPLaca = this.onibus[i].OnibusNumero;


      let fraseHorario: string;

      let horario =
        {
          y: atual.y,
          m: atual.m,
          d: atual.d,
          h: atual.h,
          i: atual.i,
          s: atual.s
        };

      if (
        horario.y != 0 ||
        horario.m != 0 ||
        horario.d != 0 ||
        horario.h != 0 ||
        horario.i > 5
      ) {
        
        fraseHorario = `A posição do ônibus está desatualizada há mais de 5 minutos
                      <br/> Nº ônibus: ${nOnibus}
                      <br/> Empresa: ${nomeEmpresa}
                      <br/> Linha : ${linha}`;

      } else if (horario.i <= 1) {
          fraseHorario = ` Coleta realizada há menos de 1 minuto.
                      <br/> Nº ônibus: ${nOnibus}
                      <br/> Empresa: ${nomeEmpresa}
                      <br/> Linha : ${linha}`;
      } else {
          fraseHorario = ` Coleta realizada há : ${horario.i} minutos atraz.`;
      } 


      msg = fraseHorario;

  
      this.adicionarMsgNoMarcador( msg , x , google );


    });

      
      
        
  }// fim MensagemTempoColetaOnibus

  adicionarMsgNoMarcador( msg : string , index : number, google) : void {

    var msgBalaoGoogleMaps = new google.maps.InfoWindow({
      content: msg
    });


    google.maps.event.addListener(index, 'click', function () {
      msgBalaoGoogleMaps.open(this.map, index);
    });
    

  } //adicionarMsgNoMarcador

  

}
