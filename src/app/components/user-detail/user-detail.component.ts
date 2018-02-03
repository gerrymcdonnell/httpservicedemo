import { Component, OnInit } from '@angular/core';

//import UserDataservice
import { UserDataService} from '../../services/user/user.data.service';

//included with flash mesages component
import { FlashMessagesService } from 'angular2-flash-messages';

//router
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'  
})
export class UserDetailComponent implements OnInit {

  id:string;
  user:User={};

  //user obj
  /*user={
    id:'',
    name:'',
    username:'',
    email:''
  }*/


  constructor(
    public userService:UserDataService,
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
