import { Injectable } from '@angular/core';

//import map
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class DataService3 {

    /**
     * similar to dataservice this will connect to a local/remote REST service we made
     */

    RESTUrl:string='http://localhost/cake3restapi3/words.json';
  
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



  getWords(){
    return this.http.get(this.RESTUrl).map(res=>res.json());
  }

  
  //POST	/recipes.format	RecipesController::add()
  addWord(word){
    
    //var headers=this.buildAuthHeader();
    
    console.log(word);  

    //with auth headers
    //return this.http.post(this.RESTUrl,user,{headers: headers}).map(res=>res.json());

    return this.http.post(this.RESTUrl,word).map(res=>res.json());
  }

  
  //worked
  deleteWord(id){
    return this.http.delete('http://localhost/cake3restapi3/words/'+id+'.json')
    .map(res=>res.json());
  }

  
  //PUT	/recipes/123.format	RecipesController::edit(123)
  updateWord(word){
      console.log("doing update via PUT request");
      console.log(word);
      return this.http.put('http://localhost/cake3restapi3/words/'+word.id+'.json', word)
          .map(res => console.log(res.json()));
  }
  
   

}
