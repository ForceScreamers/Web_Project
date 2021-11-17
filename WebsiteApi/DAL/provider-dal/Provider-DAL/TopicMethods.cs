using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using System.Data.OleDb;
using DAL;
using System.Web.Services;

namespace Provider_DAL
{
    class TopicMethods
    {
        [WebMethod]
        public static int AddTopic(string topicName, int topicStatus)
        {
            string com = "INSERT INTO topic (topic_name, topic_status) VALUES (@topic_name, @topic_status)";

            //  Pass as sql parameters for the parameterized query
            OleDbParameter[] queryParameters = {
                new OleDbParameter("@topic_name", topicName),
                new OleDbParameter("@topic_status", topicStatus)
            };

            return oledbhelper.Execute(com, queryParameters);
        }
        public static int DeleteTopic(int topicId)
        {
            string com = "DELETE FROM topic WHERE topic_id=@topic_id";
            OleDbParameter[] queryParameters = {
                new OleDbParameter("@topic_id", topicId)
            };

            return oledbhelper.Execute(com, queryParameters);
        }
    }
}
