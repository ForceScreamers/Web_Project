using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using System.Data.Odbc;
using DAL;

namespace ProviderDal
{
    public class PostMethods
    {
        //TODO: Find what this class is used for, if nothing then delete it.

        public static DataTable GetPostsForProvider(int providerId)
        {
            //  Select post description and topic name
            string com ="SELECT topic.topic_name, post.post_description, provider.provider_id FROM provider INNER JOIN(topic INNER JOIN post ON topic.topic_id = post.topic_id) ON provider.provider_id = post.provider_id WHERE(((provider.provider_id) =[?]));";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_id", providerId)
            };
            return UsersOdbcHelper.GetTable(com, queryParameters);
        }
        public static int AddPost(int providerId, string postDescription, int topicId, int postStatus)
        {
            string com = "INSERT INTO post (provider_id, post_description, topic_id, post_status) VALUES (@provider_id, @post_description, @topic_id, @post_status)";

            //  Pass as sql parameters for the parameterized query
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_id", providerId),
                new OdbcParameter("@post_description", postDescription),
                new OdbcParameter("@topic_id", topicId),
                new OdbcParameter("@post_status", postStatus)
            };

            return UsersOdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteArticle(int articleId)
        {
            string com = "DELETE FROM post WHERE post_id=@post_id";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@post_id", articleId)
            };

            return UsersOdbcHelper.Execute(com, queryParameters);

        }
        public static int ApprovePost(int postId)
        {
            string com = "UPDATE post SET post_status=-1 WHERE post_id=?";
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@post_id", postId),
            };
            return UsersOdbcHelper.Execute(com, queryParameters);
        }
        
    }
}
