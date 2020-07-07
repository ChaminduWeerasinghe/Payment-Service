import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentInsertComponent } from './payment-insert/payment-insert.component';
import { PaymentFullDetailComponent } from './payment-full-detail/payment-full-detail.component';
import { PaymentParentComponent } from './payment-parent/payment-parent.component';



const routes: Routes = [
  { path: '', component: PaymentParentComponent },
  { path: 'paymentinfo/:id', component: PaymentFullDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [PaymentDetailsComponent, PaymentInsertComponent, PaymentFullDetailComponent];

