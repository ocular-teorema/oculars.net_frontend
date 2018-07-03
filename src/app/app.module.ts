import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http/http.service';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LkComponent } from './components/lk/lk.component';
import { UserService } from './services/user/user.service';
import { StoreModule } from '@ngrx/store';
import { TokenService } from './services/token/token.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    LkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({})
  ],
  providers: [
    HttpService,
    UserService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
