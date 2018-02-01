import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'  
})
export class NavbarComponent implements OnInit {

  constructor(public flashMessagesService: FlashMessagesService) {  

  
  }

  ngOnInit() {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      //this.flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }
}
