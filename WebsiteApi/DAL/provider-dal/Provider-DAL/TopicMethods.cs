using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using DAL;
using System.Data.Odbc;

namespace ProviderDal
{
    public class TopicMethods
    {
        public static int AddTopic(string topicName, int topicStatus)
        {
            string com = "INSERT INTO topic (topic_name, topic_status) VALUES (@topic_name, @topic_status)";

            //  Pass as sql parameters for the parameterized query
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@topic_name", topicName),
                new OdbcParameter("@topic_status", topicStatus)
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteTopic(int topicId)
        {
            string com = "DELETE FROM topic WHERE topic_id=@topic_id";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@topic_id", topicId)
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int ApproveTopic(int topicId)
        {
            string com = "UPDATE topic SET topic_status=-1 WHERE topic_id=?";
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@topic_id", topicId),
            };
            return OdbcHelper.Execute(com, queryParameters);
        }
    }
}
