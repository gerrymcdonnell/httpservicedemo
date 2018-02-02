import { Component, OnInit } from '@angular/core';

//import Dataservice
import { DataService3 } from '../../services/data.service3';

@Component({
  selector: 'app-sandbox3',
  templateUrl: './sandbox3.component.html'
})
export class SandboxComponent3 implements OnInit {

  //array of users
  words:any[];

  //single user to be added to form
  word={
    id:'',
    wordtitle:'',
    word_syllables:''
  }

  isEdit:boolean=false;
  saveStatus:string="Add Word";

  constructor(public dataService3:DataService3) {

    //use data service its a n obseravble so we must subscribe to it
    this.dataService3.getWords().subscribe(words=>{
        //NOTE: this may cuases problem check cakephp output
        this.words=words;
    })       

   }

  ngOnInit() {
  }


  onSubmit(isEdit){
        
    if(isEdit==true){
        //edit user
        this.dataService3.updateWord(this.word).subscribe(word=>{
            
            console.log("calling updateUser()");

            //look for the one we edited and add new one back
            for(let i=0;i<this.words.length;i++){
                if(this.words[i].id==this.word.id){
                    //splice removes elements from an array
                    this.words.splice(i,1);
                    console.log("doing splice");
                }
            }
            //add it back to the top
            this.words.unshift(this.word);
        })
    }
    else{
        //its an add user
        console.log("adding word...");
        this.dataService3.addWord(this.word).subscribe(word=>{
            this.words.unshift(word);
            console.log(word);
        })
    }  
  }



  onDeleteClick(id){
    this.dataService3.deleteWord(id).subscribe(res=>{
        console.log(res);
        
        //loop all users and find the one we just deleted
        for(let i=0;i<this.words.length;i++){
            if(this.words[i].id==id){
                //splice removes elements from an array
                this.words.splice(i,1);
            }
        }

    })
  }// end delete
  

//$e is event object
onEditClick($e,word){
    this.isEdit=true;
    this.word=word;
    console.log("edit button clicked - onEditClick()");

    //change text of save/add button to edit
    this.saveStatus="Save Edit";

    console.log($e);
}




}
