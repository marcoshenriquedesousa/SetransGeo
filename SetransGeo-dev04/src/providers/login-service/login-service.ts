import { Injectable } from '@angular/core';

import {Headers, Http,Response, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class LoginServiceProvider {

  api_url = 'http://localhost/token/token/wp-json/jwt-auth/v1/token';

  constructor(
    public http : Http,
    ) {
    console.log('Hello LoginServiceProvider Provider');
  }

  
    // let data = {
    //  username: "dordrian",
    //  password: "dordrian"
    // };
 

   // let headers = new HttpHeaders();
   // let headers = new Headers();
   // headers.append('Content-Type', 'application/json');
   
   // let headers = new Headers();
   // headers.set('Content-Type', 'application/json');
   
   // let headers = new Headers();
   // headers.append('app-id', '12');
   // headers.append('app-key', '12');
   // headers.append('Content-Type', 'application/json');


   // this.http.post(this.api_url, data, {headers: headers})
   // .subscribe(data => {
   //   console.log(data);
   //   localStorage.setItem('wpIonicToken', JSON.stringify(data));
   // });

  //  let headers = new Headers();
   
  //  headers.append('Content-Type', 'application/json');
  //  // headers.append('Authorization', 'Bearer ' + "tokenContent");
  //  let options = new RequestOptions({headers : headers});
   
  //  this.http.post( this.api_url , data ,  options)
  //  .subscribe(data => {
  //    console.log(data);
  //    localStorage.setItem('wpIonicToken', JSON.stringify(data));
  //  } , error =>  { console.log("erro post");
  //   });
   
 


//  this.http.get("https://dordrian.000webhostapp.com/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)

// this.http.get("http://localhost/token/token/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username+ "&password="+ this.password)


login( username , password ) : Observable<Response> {  
  return this.http.get("http://www.buson.com.br/api/auth/generate_auth_cookie/?insecure=cool&username=" + username + "&password=" + password);
}

}
