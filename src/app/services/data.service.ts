import { Injectable } from '@angular/core';

//import map
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class DataService {

    users:string[];

    RESTUrl:string='http://jsonplaceholder.typicode.com/users';
  
    //inject as dependancy
    constructor(public http:Http){ 
      
    }

  getUsers(){
    return this.http.get(this.RESTUrl).map(res=>res.json());
  }

  addUser(user){
      return this.http.post(this.RESTUrl,user).map(res=>res.json());
  }

  deleteUser(id){
      return this.http.delete(this.RESTUrl+id).map(res=>res.json());
  }


  updateUser(user){
      console.log("doing update via PUT request");
      console.log(user);
      return this.http.put(this.RESTUrl+user.id, user)
          .map(res => console.log(res.json()));
  }

   

}
