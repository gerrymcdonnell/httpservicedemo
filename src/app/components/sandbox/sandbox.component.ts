import { Component, OnInit } from '@angular/core';

//import Dataservice
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  //array of users
  users:any[];

  //single user to be added to form
  user={
    id:'',
    name:'',
    email:'',
    phone:''
  }

  isEdit:boolean=false;

  constructor(public dataService:DataService) {

    //use data service its a n obseravble so we must subscribe to it
    this.dataService.getUsers().subscribe(users=>{
      this.users=users;
    })       

   }

  ngOnInit() {
  }


  onSubmit(isEdit){
        
    if(isEdit==true){
        //edit user
        this.dataService.updateUser(this.user).subscribe(user=>{
            
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
        })
    }
    else{
        //its an add user
        console.log("adding user...");
        this.dataService.addUser(this.user).subscribe(user=>{
            this.users.unshift(user);
            console.log(user);
        })
    }  
  }



  onDeleteClick(id){
    this.dataService.deleteUser(id).subscribe(res=>{
        console.log(res);
        
        //loop all users and find the one we just deleted
        for(let i=0;i<this.users.length;i++){
            if(this.users[i].id==id){
                //splice removes elements from an array
                this.users.splice(i,1);
            }
        }

    })
  }// end delete


onEditClick(user){
    this.isEdit=true;
    this.user=user;
    console.log("edit button clicked - onEditClick()");
}




}
