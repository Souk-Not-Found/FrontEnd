import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaiementComponent } from './paiement/paiement.component';
import { FormsModule } from '@angular/forms';
import { SupprimerInvoiceComponent } from './supprimer-invoice/supprimer-invoice.component';
import { RecommendationListComponent } from './recommendation-list/recommendation-list.component';
import { AiDashboardComponent } from './ai-dashboard/ai-dashboard.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { NotificationComponent } from './notification/notification.component';
import { NotificationTest } from './notification-test/notification-test';

@NgModule({
  declarations: [
    AppComponent,
    PaiementComponent,
    SupprimerInvoiceComponent,
    RecommendationListComponent,
    AiDashboardComponent,
    TruncatePipe,
    NotificationComponent,
    NotificationTest
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
