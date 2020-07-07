import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../shared/payment.service';
import { ipaymentDetails } from '../shared/Ipayment-details';
import { ipatient } from '../shared/payment.model';
import { ToastrService } from 'ngx-toastr';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-payment-full-detail',
  templateUrl: './payment-full-detail.component.html',
  styleUrls: ['./payment-full-detail.component.css']
})
export class PaymentFullDetailComponent implements OnInit {

  paymentDetail:ipaymentDetails;
  patientName:ipatient;

  paymentid: number;

  param: any;
  paymentDate: string;
  paymentTime:string;


  constructor(private _activatedRoute: ActivatedRoute,private _service:PaymentService, private _toaster:ToastrService) {
  }



  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.paymentid = +params['id'];
      this.retivePaymentDetails();
      this.retrivePatientName(this.paymentid);
    });

  }

  printReceipt()
  {
    var data = document.getElementById('content');

    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      let receiptName = 'Receipt ID:'+this.paymentid+'.pdf';
      pdf.save(receiptName); // Generated PDF   
    }); 
    
  }

  retrivePatientName(paymentid:number)
  {
    this._service.retrivePatientName(paymentid).subscribe(
        (data:any)=>{
          this.patientName = data;
        },
      (error)=>{
        this._toaster.error("Can't Display Patient Name","Error !");
      }
    );
  }

  retivePaymentDetails()
  {
    this._service.getPaymentDetails(this.paymentid).subscribe((data:any)=>{
      this.paymentDetail = data;
      this.paymentDate = this.paymentDetail.paymentDate.split('T')[0];
      this.paymentTime = this.paymentDetail.paymentDate.split('T')[1].split('.')[0];
      //dateArr[0];
      //dateArr[1].split('.')[0];


    });
  }

}
