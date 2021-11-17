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
    class ChildMethods
    {
        //Add
        //Delete

        public static int AddChild(int parentId)
        {
            string com = "INSERT INTO child (parent_id) VALUES (?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_id", parentId),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }

        public static int DeleteChild(int childId)
        {
            string com = "DELETE FROM child WHERE child_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_id", childId),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
    }
}
