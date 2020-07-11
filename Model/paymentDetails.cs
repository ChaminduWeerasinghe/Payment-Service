using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_payment.Model
{
    public class paymentDetails
    {
        public int paymentid { get; set; }
        public int patientid { get; set; }
        public string description { get; set; }
        public double ammount { get; set; }
        public DateTime paymentDate { get; set; }
    }
}
