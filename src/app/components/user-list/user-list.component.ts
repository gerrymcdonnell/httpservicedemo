import { Component, OnInit } from '@angular/core';

//import Dataservice
import { UserDataService } from '../../services/user/user.data.service';

//included with flash mesages component
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  //users array
  users:any[];

  //user obj
  user={
    id:'',
    name:'',
    username:'',
    email:''
  }


  isEdit:boolean=false;
  saveStatus:string="Add User";

  constructor(
      public dataService4:UserDataService,      
        public fMS:FlashMessagesService
    ) {

    //use data service its a n obseravble so we must subscribe to it
    this.dataService4.getUsers().subscribe(users=>{
        //NOTE: this may cuases problem check cakephp output
        this.users=users;
    })  
    //this.fMS.show('Showing All Users', {cssClass:'alert-success', timeout: 2000});   

   }

   
  ngOnInit() {
    //flash message doenst work
    //this.fMS.show('Sandbox', {cssClass:'alert-danger', timeout: 4000});
  }

  
  onSubmit(isEdit){
        
    if(isEdit==true){
        //edit user
        this.dataService4.updateUser(this.user).subscribe(user=>{
            
            console.log("calling updateUser()");

            //look for the one we edited and add new one back
            for(let i=0;i<this.users.length;i++){
                if(this.users[i].id==this.user.id){
                    //splice removes elements from an array
                    this.users.splice(i,1);
                    console.log("doing splice");
                }
            }
            //add it back to the top
            this.users.unshift(this.user);
            
            //change text of save/add button to edit
            this.saveStatus="Add user";
            //clear text boxes

            //donest work
            this.fMS.show('Updated user', {cssClass:'alert-success', timeout: 4000});
        })
    }
    else{
        //its an add
        console.log("adding user...");
        this.dataService4.addUser(this.user).subscribe(user=>{
            this.users.unshift(user);
            console.log(user);

            this.fMS.show('Added user', {cssClass:'alert-success', timeout: 4000});
        })
    }  
  }
  


  onDeleteClick(id){
    this.dataService4.deleteUser(id).subscribe(res=>{
        console.log(res);
        
        //loop all users and find the one we just deleted
        for(let i=0;i<this.users.length;i++){
            if(this.users[i].id==id){
                //splice removes elements from an array
                this.users.splice(i,1);
            }
        }
        this.fMS.show('Deleted user', {cssClass:'alert-success', timeout: 4000});

    })
  }// end delete
  

//$e is event object
onEditClick($e,user){
    this.isEdit=true;
    this.user=user;
    console.log("edit button clicked - onEditClick()");

    //change text of save/add button to edit
    this.saveStatus="Save Edit";

    console.log($e);
}




}


