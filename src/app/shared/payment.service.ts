import { Injectable,EventEmitter } from '@angular/core';
import { Payment } from './payment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, SubscriptionLike } from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import { ipaymentDetails } from './Ipayment-details';
import { Subscription } from 'rxjs/internal/Subscription';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { 
  }

  //event Manager
  eventEmiter = new EventEmitter();
  sub:Subscription;
  eventEmiter2 = new EventEmitter();
  sub3:Subscription;
  isInsert:boolean;
  
  readonly rootURL: 'API/Payments/';
  Data: Payment;

  //insert handler requested from payment-insert
  insertPayment(paymentJson: Payment) {
    console.log(paymentJson);
   return this.http.post('API/Payments/payment/insert', paymentJson);
  }

 
  
  //"get all payments from patientID" handler 
  getPayments(patientID:number):Observable<ipaymentDetails>
  {
    return this.http.get<ipaymentDetails>('API/Payments/'+patientID);
  }

  //Component Interation---------------------------------------------

 //(After Insert) reload payment-detail Component Using Payment-Insert Component 
  Emiter_successGetPayment()
  {
    this.eventEmiter.emit();
  }

  //(While Update) send PaymentID from payment-detail component to Payment-Insert Component 
  Emiter_updatePayment()
  {
    this.isInsert = false;
    this.eventEmiter2.emit();
  }

  //get payment details by paymentid
  getPaymentDetails(paymentID:number):Observable<ipaymentDetails>
  {
    return this.http.get<ipaymentDetails>('API/Payments/payment/'+paymentID);
  }


  deletePayment(paymentID:number):Observable<any>
  {
    return this.http.delete<any>('API/Payments/deletePayment/'+paymentID);
  }

  updatePayment(PaymentJson:Payment)
  {
    console.log(PaymentJson);
    return this.http.put("API/Payments/payment/update",PaymentJson);
  }


  //error handler
  private errorHandler(errorObj:HttpErrorResponse)
  {
    if(errorObj.error instanceof ErrorEvent)
    {
      console.error("ClientSide Error Occured : "+errorObj.error.message);
    }
    else
    {
      console.error("Server Side Error Occured : "+errorObj.error.message);
    }
  }

  retrivePatientName(paymentid:number):Observable<any>
  {
    return this.http.get("API/Payments/getPatientName/"+paymentid);
  }


}