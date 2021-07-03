import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminComponent } from './admin/admin.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddEventComponent } from './adminFunctions/add-event/add-event.component';
import { RemoveEventComponent } from './adminFunctions/remove-event/remove-event.component';
import { RemoveUserComponent } from './adminFunctions/remove-user/remove-user.component';
import { GiveAdminComponent } from './adminFunctions/give-admin/give-admin.component';
import { AddArtistComponent } from './adminFunctions/add-artist/add-artist.component';
import { RemoveArtistComponent } from './adminFunctions/remove-artist/remove-artist.component';
import { AddLocationComponent } from './adminFunctions/add-location/add-location.component';
import { RemoveLocationComponent } from './adminFunctions/remove-location/remove-location.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  { path:'profile', component:ProfileComponent },
  { path:'admin', component:AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    AddEventComponent,
    RemoveEventComponent,
    RemoveUserComponent,
    GiveAdminComponent,
    AddArtistComponent,
    RemoveArtistComponent,
    AddLocationComponent,
    RemoveLocationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
