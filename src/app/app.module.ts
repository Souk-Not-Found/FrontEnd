import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaiementComponent } from './paiement/paiement.component';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SupprimerInvoiceComponent } from './supprimer-invoice/supprimer-invoice.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { UserStatsComponent } from './components/admin/user-stats/user-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    PaiementComponent,
    SupprimerInvoiceComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditProfileComponent,
    DashboardComponent,
    ManageUsersComponent,
    AddUserComponent,
    EditUserComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    LoginAdminComponent,
    UserStatsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
