import { Injectable } from '@angular/core';

//import map
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class UserDataService {

    /**
     * similar to dataservice this will connect to a local/remote REST service we made
     */

    RESTUrl:string='http://localhost/cake3restapi3/users.json';
  
    //inject as dependancy
    constructor(public http:Http){       
    }

  //base64 encode
  buildHttpBasicAuthString(username,password){
    return 	 btoa(username + ":" + password);
  }
    
  //build header object
  buildAuthHeader(){
      var headers;        
      var auth = this.buildHttpBasicAuthString("gerry","ted");
      headers = {"Authorization": "Basic " + auth};
      return headers;
  }



  getUsers(){
    return this.http.get(this.RESTUrl).map(res=>res.json());    
  }

  getUser(id){
    return this.http.get('http://localhost/cake3restapi3/users/'+id+'.json')
    .map(res=>res.json()); 
  }

  
  //POST	/recipes.format	RecipesController::add()
  addUser(user){

    console.log(user);  
    //with auth headers
    //return this.http.post(this.RESTUrl,user,{headers: headers}).map(res=>res.json());

    return this.http.post(this.RESTUrl,user).map(res=>res.json());
  }
  
  
  //worked
  deleteUser(id){
    return this.http.delete('http://localhost/cake3restapi3/users/'+id+'.json')
    .map(res=>res.json());
  }

  
  
  //PUT	/recipes/123.format	RecipesController::edit(123)
  updateUser(user){
      console.log("doing update via PUT request");
      console.log(user);
      return this.http.put('http://localhost/cake3restapi3/users/'+user.id+'.json', user)
          .map(res => console.log(res.json()));
  }
  
   

}
