import { Component, OnInit } from '@angular/core';

//import Dataservice
import { DataService4 } from '../../services/data.service4';

//included with flash mesages component
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-sandbox4',
  templateUrl: './sandbox4.component.html'
})
export class SandboxComponent4 implements OnInit {

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

  constructor(
      public dataService4:DataService4,      
        public fMS:FlashMessagesService
    ) {

    //use data service its a n obseravble so we must subscribe to it
    this.dataService4.getWords().subscribe(words=>{
        //NOTE: this may cuases problem check cakephp output
        this.words=words;
    })  
    this.fMS.show('Showing All word', {cssClass:'alert-success', timeout: 2000});
    
    

   }

   
  ngOnInit() {
    //flash message doenst work
    this.fMS.show('Sandbox', {cssClass:'alert-danger', timeout: 4000});
  }


  onSubmit(isEdit){
        
    if(isEdit==true){
        //edit user
        this.dataService4.updateWord(this.word).subscribe(word=>{
            
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
            
            //change text of save/add button to edit
            this.saveStatus="Add Word";
            //clear text boxes

            //donest work
            this.fMS.show('Updated Word', {cssClass:'alert-success', timeout: 4000});
        })
    }
    else{
        //its an add
        console.log("adding word...");
        this.dataService4.addWord(this.word).subscribe(word=>{
            this.words.unshift(word);
            console.log(word);

            this.fMS.show('Added Word', {cssClass:'alert-success', timeout: 4000});
        })
    }  
  }



  onDeleteClick(id){
    this.dataService4.deleteWord(id).subscribe(res=>{
        console.log(res);
        
        //loop all users and find the one we just deleted
        for(let i=0;i<this.words.length;i++){
            if(this.words[i].id==id){
                //splice removes elements from an array
                this.words.splice(i,1);
            }
        }
        this.fMS.show('Deleted Word', {cssClass:'alert-success', timeout: 4000});

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
