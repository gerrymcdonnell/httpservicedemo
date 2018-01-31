import { Component, OnInit } from '@angular/core';

//import Dataservice
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  users:any[];

  //single user to be added to form
  user={
    name:'',
    email:'',
    phone:''
  }

  constructor(public dataService:DataService) {

    //use data service its a n obseravble so we must subscribe to it
    this.dataService.getUsers().subscribe(users=>{
      this.users=users;
    })       

   }

  ngOnInit() {
  }


  onSubmit(){     

    //its an add user
    this.dataService.addUser(this.user).subscribe(user=>{
      
      console.log("logging response "+user);
      
      //add to start of array so we can at top of page          
      this.users.unshift();            
    })

  }//end submit

}
