using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_payment.Model;

namespace API_payment.Data
{
    public interface IPayment
    {
        IEnumerable<paymentDetails> GetPaymentByPatientID(int patientID);

        paymentDetails GetPayment(int paymentID);

        string insertPayment(Payment payment);

        string deletePayment(int paymentID);

        public string getPatientName(int paymentID);

        public string updatePayment(Payment payment);

    }
}
