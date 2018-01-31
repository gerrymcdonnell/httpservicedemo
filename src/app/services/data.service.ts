import { Injectable } from '@angular/core';

//import map
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class DataService {

    //inject as dependancy
    constructor(public http:Http){ 
      
    }

    getUsers(){
      return this.http.get('http://jsonplaceholder.typicode.com/users')
      .map(res=>res.json());
  }

   

}
