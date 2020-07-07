import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentParentComponent } from './payment-parent/payment-parent.component';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './shared/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    PaymentParentComponent
  ], 
  imports: [

    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
