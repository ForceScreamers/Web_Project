using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using System.Data.OleDb;
using DAL;

namespace Provider_DAL
{
    class ProviderMethods
    {
        

        public static int AddProvider(string providerUsername, string providerEmail, string providerPassword, string providerRegistrationDate, string providerOccupation, int providerStatus)
        {
            string com = "INSERT INTO provider (provider_username, provider_email, provider_password, provider_registration_date, provider_occupation, provider_status) VALUES (@provider_username, @provider_email, @provider_password, @provider_registration_date, @provider_occupation, @provider_status)";

            //  Pass as sql parameters for the parameterized query
            OleDbParameter[] queryParameters = {
                
                new OleDbParameter("@provider_username", providerUsername),
                new OleDbParameter("@provider_email", providerEmail),
                new OleDbParameter("@provider_password", providerPassword),
                new OleDbParameter("@provider_registration_date", providerRegistrationDate),
                new OleDbParameter("@provider_occupation", providerOccupation),
                new OleDbParameter("@provider_status", providerStatus)
            };

            return oledbhelper.Execute(com, queryParameters);
        }
        public static int DeleteProvider(int providerId)
        {
            string com = "DELETE FROM provider WHERE provider_id=@provider_id";
            OleDbParameter[] queryParameters = {
                new OleDbParameter("@provider_id", providerId)
            };

            return oledbhelper.Execute(com, queryParameters);
        }
    }
}
