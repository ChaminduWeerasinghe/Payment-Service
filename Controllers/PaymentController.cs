using API_payment.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_payment.Data;

namespace API_payment.Controllers
{
    [Route("API/Payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {

        private readonly IPayment _payment;
        public PaymentController(IPayment payment)
        {
            _payment = payment;
        }

        [HttpPost]
        [Route("payment/insert")]
        public ActionResult insertPayment([FromBody]Payment payment)
        {
            Console.WriteLine(payment);
            var result = _payment.insertPayment(payment);
            return Ok(result);
        }

        [HttpGet]
        [Route("{patientID}")]
        public ActionResult<IEnumerable<paymentDetails>> GetPayments(int patientID)
        {
            var result = _payment.GetPaymentByPatientID(patientID);
            return Ok(result);
        }

        [HttpGet]
        [Route("payment/{paymentID}")]
        public ActionResult<paymentDetails> getPaymentDetails(int paymentID)
        {
            var result = _payment.GetPayment(paymentID);
            return Ok(result);
        }

        [HttpDelete]
        [Route("deletePayment/{paymentID}")]
        public ActionResult deletePayment(int paymentID)
        {
            var result = _payment.deletePayment(paymentID);
            return Ok(result);
        }

        [HttpGet]
        [Route("getPatientName/{id}")]
        public ActionResult<string> getName(int id)
        {
           var name = _payment.getPatientName(id);
            return Ok(name);
        }

        [HttpPut]
        [Route("payment/update")]
        public ActionResult<string> updatePaymentDetails([FromBody]Payment payment)
        {
            Console.WriteLine("Came here  : "+payment);
            string rslt = _payment.updatePayment(payment);
            return Ok(rslt);
        }
    }
}
