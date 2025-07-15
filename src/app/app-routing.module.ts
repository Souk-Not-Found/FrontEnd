import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiementComponent } from './paiement/paiement.component';
import { SupprimerInvoiceComponent } from './supprimer-invoice/supprimer-invoice.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';

import { LoginComponent  } from './components/user/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';


const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'paiement', component: PaiementComponent },
  { path: 'supprimer-facture', component: SupprimerInvoiceComponent },
  // Utilisateur
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/home', component: HomeComponent },
  { path: 'user/edit-profile', component: EditProfileComponent },

  // Admin
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/manage-users', component: ManageUsersComponent },
  { path: 'admin/add-user', component: AddUserComponent },
  { path: 'admin/edit-user/:id', component: EditUserComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
