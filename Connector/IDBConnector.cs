using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace API_payment.Connector
{
    public interface IDBConnector
    {
        IDbConnection Connection { get; }
    }
}
