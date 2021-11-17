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
    class PostMethods
    {
        public static int AddPost(int providerId, string postDescription, int topicId, int postStatus)
        {
            string com = "INSERT INTO post (provider_id, post_description, topic_id, post_status) VALUES (@provider_id, @post_description, @topic_id, @post_status)";

            //  Pass as sql parameters for the parameterized query
            OleDbParameter[] queryParameters = {
                new OleDbParameter("@provider_id", providerId),
                new OleDbParameter("@post_description", postDescription),
                new OleDbParameter("@topic_id", topicId),
                new OleDbParameter("@post_status", postStatus)
            };

            return oledbhelper.Execute(com, queryParameters);
        }
        public static int DeletePost(int postId)
        {
            string com = "DELETE FROM post WHERE post_id=@post_id";
            OleDbParameter[] queryParameters = {
                new OleDbParameter("@post_id", postId)
            };

            return oledbhelper.Execute(com, queryParameters);

        }
        
    }
}
