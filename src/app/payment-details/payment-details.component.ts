import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../shared/payment.service';
import {ipaymentDetails} from '../shared/Ipayment-details';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  public paymentDetail :ipaymentDetails;

  constructor(private _router: Router, private _activatedRouter: ActivatedRoute,private _service:PaymentService, private _toaster:ToastrService) { }

  clickPaymentDetail(id): void {
    this._router.navigate(['/paymentinfo',id]);
  }
  deletePaymentDetail(id):void
  {
    this.deletePayment(id);
  }

  ngOnInit() {
    if(this._service.sub == undefined)
    {
      this._service.sub = this._service.eventEmiter.subscribe((name:string)=>{
        this.retrivePayment();
      });
    }
    this.retrivePayment();
    this._service.sub = undefined;
  }

   //
   cleanInsert()
   {
    this._service.isInsert = true
    this._service.Data.patientID = null;
    this._service.Data.paymentID = null;
    this._service.Data.ammount = null;
    this._service.Data.description = '';
   }

  retrivePayment()
  {
    this._service.getPayments(1).subscribe((data:any)=>{
      this.paymentDetail = data;
      
    });
  }

  deletePayment(id:number)
  {
    this._service.deletePayment(id).subscribe(
      (success)=>{
        this._toaster.warning("","Deletion Successful");
        this.retrivePayment();
        this.cleanInsert();
      },
      (error)=>{
       
      }
    );
  }

  updatePayment(paymentID:number)
  {
      this._service.Data.paymentID = paymentID;
      this._service.Emiter_updatePayment();
  }

}
