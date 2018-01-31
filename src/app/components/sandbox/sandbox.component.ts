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

  constructor(public dataService:DataService) {

    //use data service
    this.dataService.getUsers().subscribe(users=>{
      this.users=users;
    })       

   }

  ngOnInit() {
  }

}
