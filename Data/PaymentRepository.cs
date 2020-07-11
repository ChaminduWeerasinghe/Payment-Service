using API_payment.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using API_payment.Connector;


namespace API_payment.Data
{
    public class PaymentRepository : IPayment
    {
        private readonly IDBConnector _connection;

        public PaymentRepository(IDBConnector connector)
        {
            _connection = connector;
        }

        public string deletePayment(int paymentID)
        {
            var result = 0;
            using (_connection.Connection)
            {
                string sql = @"delete from paymentDetails where paymentid = @paymentid";
                result = _connection.Connection.Execute(sql, new { paymentID});

                if (result > 0)
                {
                    return "{\"status\": \"success\"}";
                }
                else
                {
                    return "{\"status\": \"error\"}";
                }
            }
        }

        public paymentDetails GetPayment(int paymentID)
        {
            using (_connection.Connection)
            {
                string sql = @"select * from paymentDetails where paymentid = @paymentid";
                var result = _connection.Connection.Query<paymentDetails>(sql, new { paymentID }).SingleOrDefault();
                return result;
            }
        }

        public IEnumerable<paymentDetails> GetPaymentByPatientID(int patientID)
        {
            var list = new List<paymentDetails>();
            using (_connection.Connection)
            {
                string sql = @"select * from paymentDetails where patientid = @patientid";
                list = _connection.Connection.Query<paymentDetails>(sql,new { patientID}).ToList();

                return list;
            }
        }

        public string insertPayment(Payment payment)
        {
            var result = 0;
            using (_connection.Connection)
            {
                paymentDetails pd = new paymentDetails();
                pd.patientid = payment.patientID;
                pd.description = payment.description;
                pd.ammount = payment.ammount;

                string sql = @"insert into paymentDetails(patientid,description,ammount) values(@patientID,@description,@ammount);";
                result = _connection.Connection.Execute(sql,pd);
                
                if(result > 0)
                {
                    return "{\"status\": \"success\"}";
                }
                else
                {
                    return "{\"status\": \"error\"}";
                }
            }
        }

        public string getPatientName(int id)
        {
            using (_connection.Connection)
            {
                string sql = @"select pa.ptName from paymentDetails p, patients pa where p.patientid = pa.ptID AND p.paymentid = @id";
                string name = _connection.Connection.Query<string>(sql, new { id }).SingleOrDefault();


                if (!string.IsNullOrWhiteSpace(name))
                {
                    return "{\"status\": \"success\", \"name\": \""+name+"\"}";
                }
                else
                {
                    return "{\"status\": \"success\"}";
                }
            }
        }

        public string updatePayment(Payment payment)
        {
            using (_connection.Connection)
            {

                string sql = @"update paymentDetails set patientid = @patientid, ammount = @ammount, description = @description where paymentid = @paymentid";
                var rslt = _connection.Connection.Execute(sql, payment);

                if (rslt > 0)
                {
                    return "{\"status\": \"success\"}";
                }
                else
                {
                    return "{\"status\": \"error\"}";
                }

            }
        }
    }
}
