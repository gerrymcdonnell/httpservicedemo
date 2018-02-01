import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';

//component to connect to local rest
import { SandboxComponent2 } from './components/sandbox2/sandbox2.component';

import {FormsModule} from '@angular/forms';

//import Dataservice
//uses remote wen rest for example
import { DataService } from './services/data.service';

//dataservice to connect to local host rest
//uses http://localhost/cake3restapi2/words.json
import { DataService2 } from './services/data.service2';

//uses the endpoint http://localhost/cake3restapi3/
import { DataService3 } from './services/data.service3';
import { SandboxComponent3 } from './components/sandbox3/sandbox3.component';

//navbar
import{NavbarComponent} from './components/navbar/navbar.component';

//routing
import {RouterModule,Routes} from '@angular/router';

//flsh messages module
import { FlashMessagesModule } from 'angular2-flash-messages';


//create routes for app
const appRoutes:Routes=[
  {path:'',component:SandboxComponent3},
  {path:'sandbox',component:SandboxComponent},
  {path:'sandbox2',component:SandboxComponent2},
  {path:'sandbox3',component:SandboxComponent3},
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SandboxComponent,
    SandboxComponent2,
    SandboxComponent3
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    DataService,
    DataService2,
    DataService3
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
