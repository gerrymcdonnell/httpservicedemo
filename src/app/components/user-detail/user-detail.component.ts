import { Component, OnInit } from '@angular/core';

//import Dataservice
import { DataService4 } from '../../services/data.service4';

//included with flash mesages component
import { FlashMessagesService } from 'angular2-flash-messages';

//router
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { Client } from '../../models/Client';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'  
})
export class UserDetailComponent implements OnInit {

  id:string;

  //user obj
  user={
    id:'',
    name:'',
    username:'',
    email:''
  }


  constructor(
    public userService:DataService4,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }



  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    // Get Client
    this.userService.getUser(this.id).subscribe(user=> {
      this.user= user;
      console.log(this.user);
    });
  }

}
