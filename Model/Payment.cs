using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_payment.Model
{
    public class Payment
    {
        public int paymentid { get; set; }
        public int patientID { get; set; }
        public double ammount { get; set; }

        public string description { get; set; }
        public string cardNo { get; set; }
        public string cvc { get; set; }
        public string nameOnCard { get; set; }

        public string expDate { get; set; }

    }
}
