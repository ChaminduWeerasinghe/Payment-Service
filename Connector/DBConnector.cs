using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace API_payment.Connector
{
    public class DBConnector : IDBConnector
    {
        private IConfiguration _configuration;
        private string _connectionString;
        public DBConnector(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection Connection
        {
            get
            {
                _connectionString = _configuration.GetConnectionString("localConnection");
                Console.WriteLine("---------------------Connection String " + _connectionString);
                return new SqlConnection(_connectionString);
            }
        }
    }
}
