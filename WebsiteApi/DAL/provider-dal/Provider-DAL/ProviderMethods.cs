using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data; 
using DAL;
using System.Data.Odbc;
using Provider_DAL;

namespace ProviderDal
{
    public class ProviderMethods
    {
        public static int AddProvider(string providerFullName, string providerEmail, string providerPassword, string providerRegistrationDate, string providerOccupation)
        {
            string com = "INSERT INTO provider (provider_full_name, provider_email, provider_password, provider_registration_date, provider_occupation) VALUES (?, ?, ?, ?, ?)";

            //  Pass as sql parameters for the parameterized query
            OdbcParameter[] queryParameters = {
                
                new OdbcParameter("@provider_full_name", providerFullName),
                new OdbcParameter("@provider_email", providerEmail),
                new OdbcParameter("@provider_password", providerPassword),
                new OdbcParameter("@provider_registration_date", providerRegistrationDate),
                new OdbcParameter("@provider_occupation", providerOccupation),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteProvider(int providerId)
        {
            string com = "DELETE FROM provider WHERE provider_id=@provider_id";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_id", providerId)
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int ConfirmProvider(int providerId)
        {
            string com = "UPDATE provider SET provider_status=-1 WHERE provider_id=?";
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@provider_id", providerId),
            };
            return OdbcHelper.Execute(com, queryParameters);
        }
        public static bool IsExists(string providerEmail)
        {
            string com = "SELECT provider_email FROM provider WHERE provider_email=? ";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_email", providerEmail),
            };

            DataTable dt = OdbcHelper.GetTable(com, queryParameters);

            if (dt.Rows.Count > 0)
            {
                exists = true;
            }

            return exists;
        }

        public static bool IsRegistered(string providerEmail, string providerPassword)
        {
            string com = "SELECT provider_email, provider_password FROM provider WHERE provider_email=? AND provider_password=?";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_email", providerEmail),
                new OdbcParameter("@provider_password", providerPassword),
            };

            DataTable dt = OdbcHelper.GetTable(com, queryParameters);

            if (dt.Rows.Count > 0)
            {
                exists = true;
            }

            return exists;
        }
        public static bool IsPermitted(string providerEmail)
        {
            string com = "SELECT provider.provider_status, provider.provider_email, provider.provider_id FROM provider WHERE(((provider.provider_email) =[?])); ";
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@provider_email", providerEmail),
            };

            DataTable dt = OdbcHelper.GetTable(com, queryParameters);

            //  The field inside the db table which indicates whether or not a provider has been permitted
            bool permitted = (bool)dt.Rows[0].ItemArray[0];

            return permitted;
        }

        public static ProviderInfo GetProviderInfo(string parentEmail, string parentPassword)
        {
            string com = "SELECT provider_id, provider_full_name, provider_occupation, provider_email FROM provider WHERE provider_email=?";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_email", parentEmail),
            };

            //  Execute command
            DataTable dt = OdbcHelper.GetTable(com, queryParameters);

            int providerId = int.Parse(dt.Rows[0].ItemArray[0].ToString());
            string providerFullName = dt.Rows[0].ItemArray[1].ToString();
            string providerOccupation = dt.Rows[0].ItemArray[2].ToString();
            string providerEmail = dt.Rows[0].ItemArray[3].ToString();

            return new ProviderInfo(providerFullName, providerId, providerOccupation, providerEmail);
            //return null;
        }

        public static DataTable GetProviders()
        {

            string com = "SELECT provider_id, provider_full_name, provider_occupation, provider_email FROM provider WHERE provider_status=0";

            //  Execute command
            return OdbcHelper.GetTable(com, new OdbcParameter[0]);
        }

         
    }
}
