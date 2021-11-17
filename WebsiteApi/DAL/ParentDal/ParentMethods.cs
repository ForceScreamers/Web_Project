using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using System.Data;
using System.Data.Odbc;
using DAL;

namespace ParentDal
{
    public class ParentMethods
    {
        
        
        public static int AddParent(string parentUsername, string parentEmail, string parentPassword, string parentRegistrationDate)
        {
            string com = "INSERT INTO parent (parent_username, parent_email, parent_password, parent_registration_date) VALUES (?, ?, ?, ?)";

            //  Pass as sql parameters for the parameterized query
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_username", parentUsername),
                new OdbcParameter("@parent_email", parentEmail),
                new OdbcParameter("@parent_password", parentPassword),
                new OdbcParameter("@parent_registration_date", parentRegistrationDate),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteParent(int parentId)
        {
            string com = "DELETE FROM parent WHERE parent_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_id", parentId)
            };
            return OdbcHelper.Execute(com, queryParameters);
        }
        public static bool IsExists(string parentEmail, string parentPassword)
        {
            string com = "SELECT parent_email, parent_password FROM parent WHERE parent_email=? AND parent_password=?";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_email", parentEmail),
                new OdbcParameter("@parent_password", parentPassword)
            };

            //Add if check for existing users
            DataTable dt = OdbcHelper.GetTable(com, queryParameters);

            if (dt.Rows.Count > 0)
            {
                exists = true;
            }

            return exists;
        }
    }
}
