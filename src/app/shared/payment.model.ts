import { stringify } from 'querystring';

export class Payment {
  paymentID: number;
  patientID: number;
  ammount: number;
  description: string;
  nameOnCard: string;
  cardNo: string;
  expDate: string;
  cvc: string;

}

export interface ipatient
{
  status:string;
  name:string;
}
