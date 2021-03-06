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
import { EventItemComponent } from './event-item/event-item.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { PurchaseComponent } from './purchase/purchase.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  { path:'profile', component:ProfileComponent, canActivate:[AuthGuard] },
  { path:'admin', component:AdminComponent, canActivate:[AuthGuard, AdminGuard] },
  { path:'purchase', component:PurchaseComponent, canActivate:[AuthGuard] },
  { path:'changePassword', component:ChangePasswordComponent, canActivate:[AuthGuard] }
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
    RemoveLocationComponent,
    EventItemComponent,
    PurchaseComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, {provide: HTTP_INTERCEPTORS, multi: true, useClass:TokenInterceptor}],
  bootstrap: [AppComponent]
})
export class AppModule { }
