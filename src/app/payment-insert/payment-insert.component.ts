import { Component, OnInit, PlatformRef, Input } from '@angular/core';
import { PaymentService } from '../shared/payment.service';
import { NgForm } from '@angular/forms';
import 'fast-luhn';
import * as luhn from 'fast-luhn';
import { ToastrService } from 'ngx-toastr';
import { ipaymentDetails } from '../shared/Ipayment-details';

@Component({
  selector: 'app-payment-insert',
  templateUrl: './payment-insert.component.html',
  styleUrls: ['./payment-insert.component.css']
})
export class PaymentInsertComponent implements OnInit {

  constructor(private data: PaymentService,private _service:PaymentService,private _toastr: ToastrService) {
  }

  paymentData:ipaymentDetails;
  rslt:boolean;
  rsltString:string;



  ngOnInit() {
    this._service.isInsert = true;
    if(this._service.sub == undefined)
    {
      this._service.sub = this._service.eventEmiter2.subscribe((name:string)=>{
      this.retrivePayment_updatePayment(this._service.Data.paymentID);
      });
    }
    this.onLoad();
  }

  retrivePayment_updatePayment(paymentID:number)
  {
    this._service.getPaymentDetails(paymentID).subscribe(
      (data:any)=>{
        this.paymentData = data;
        this.data.Data.patientID = this.paymentData.patientid;
        this.data.Data.ammount = this.paymentData.ammount;
        this.data.Data.description = this.paymentData.description;
      },
      (error)=> {
        this._toastr.error("Can't Retreive Payment Details from Server","Something Went Wrong!");
      }
      );


  }

  onLoad(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.data.Data = {
      paymentID: null,
      patientID: null,
      ammount: null,
      description: '',
      nameOnCard: '',
      cardNo: '',
      expDate: '',
      cvc: ''
    }

    this.rsltString = 'Card Number Cant Empty';

  }


  onCrdNumChange(numb:string){
    try{

      if(numb != '')
      {
        if(luhn(numb))
        {
          this.rslt = false;
        }
        else if(luhn(numb) == '')
        {
          this.rslt = true;
          this.rsltString = 'Wrong Card Number';
        }
      }
      else{
        console.log("came here");
        this.rsltString = 'Card Number Cant Empty';
      }
    }
    catch(e)
    { 
      console.log("Exception");
    }
    
  }

  displayError(str:string)
  {
    this._toastr.error(str,"Error");
  }

  onSubmit(formREF: NgForm)
  {
    if(this.data.Data.patientID != null)
    {
      if(this.data.Data.ammount !=  null)
      {
        if(this.data.Data.description != '')
        {
          
          if(this.data.Data.nameOnCard != '')
          { 
            if(this.data.Data.cardNo != '' && !this.rslt)
            {
              if(this.data.Data.cvc != '')
              {
                if(this.data.Data.expDate != '')
                {
                  if(this._service.isInsert === true)
                  {
                    this.data.insertPayment(formREF.value).subscribe(
                      (success) => {
                
                       this._toastr.success("Successfully Inserted", "Success");
                        this.onLoad();
                        this._service.Emiter_successGetPayment();
                        formREF.reset();
                      },
                      (error) =>{
                        this._toastr.error("Please Contact Support Team","Something Went Wrong!");
                      }
                
                    );
                  }
                  else if(this._service.isInsert === false) //update Payment
                  {
                    this._service.updatePayment(formREF.value).subscribe(
                      (success)=>{
                        this._toastr.info("","Successfully Updated");
                        this._service.Emiter_successGetPayment();
                        formREF.reset();
                      },
                      (error)=>{
                        this._toastr.error("Please Contact Support Team","Something Went Wrong!");
                      }
                    );
                    this.onLoad();
                    this._service.isInsert = true;
                  }
                }else
                {
                  this.displayError("Expire Date Cannot be Empty")
                }
              }else
              {
                this.displayError("CVC Cannot be Empty")
              }
            }
            else if(this.rslt)
            {
              this.displayError("Wrong Card Number")
            }
            else
            {
              this.displayError("Card Number Cannot be Empty");
            }
          }else    
          {
            this.displayError("Card Holder Name Cannot be Empty");
          }

        }else
        {
          this.displayError("Description Cannot be Empty");
        }

      }else
      {
        this.displayError("Ammount Cannot be Empty");
      }

    }
    else
    {
      this.displayError("Patient ID Cannot be Empty")
    }


   
    
  }


}
