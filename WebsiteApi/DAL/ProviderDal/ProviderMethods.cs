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

            return UsersOdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteProvider(int providerId)
        {
            string com = "DELETE FROM provider WHERE provider_id=@provider_id";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_id", providerId)
            };

            return UsersOdbcHelper.Execute(com, queryParameters);
        }
        public static int ConfirmProvider(int providerId)
        {
            string com = "UPDATE provider SET provider_status=-1 WHERE provider_id=?";
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@provider_id", providerId),
            };
            return UsersOdbcHelper.Execute(com, queryParameters);
        }
        public static bool IsExists(string providerEmail)
        {
            string com = "SELECT provider_email FROM provider WHERE provider_email=? ";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_email", providerEmail),
            };

            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

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

            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

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

            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

            //  The field inside the db table which indicates whether or not a provider has been permitted
            bool permitted = (bool)dt.Rows[0].ItemArray[0];

            return permitted;
        }

        public static ProviderInfo GetProviderInfo(string parentEmail, string parentPassword)
        {
            string com = "SELECT provider_id, provider_full_name, provider_occupation, provider_email, provider_phone FROM provider WHERE provider_email=?";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_email", parentEmail),
            };

            //  Execute command

            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

            int providerId = int.Parse(dt.Rows[0].ItemArray[0].ToString());
            string providerFullName = dt.Rows[0].ItemArray[1].ToString();
            string providerOccupation = dt.Rows[0].ItemArray[2].ToString();
            string providerEmail = dt.Rows[0].ItemArray[3].ToString();
            string providerPhoneNumber = dt.Rows[0].ItemArray[4].ToString();

            return new ProviderInfo(providerFullName, providerId, providerOccupation, providerEmail, providerPhoneNumber);
            //return null;
        }

        public static DataTable GetProviders()
        {

            string com = "SELECT provider_id, provider_full_name, provider_occupation, provider_email FROM provider WHERE provider_status=0";

            //  Execute command
            return UsersOdbcHelper.GetTable(com, new OdbcParameter[0]);
        }


        public static DataTable GetAllArticlesByProviderId(int providerId)
        {
            string com = @"SELECT article.article_content, topic.topic_title, article.article_title, article.article_content, article.article_id, provider.provider_id
                            FROM topic 
                            INNER JOIN(provider INNER JOIN article ON provider.provider_id = article.provider_id) 
                            ON topic.topic_id = article.topic_id
                            WHERE(((provider.provider_id) =[?]));";


            OdbcParameter[] queryParameters =
            {
                new OdbcParameter($"@provider_id", providerId),
            };

            return UsersOdbcHelper.GetTable(com, queryParameters);
        }
        public static DataTable GetArticleById(int articleId)
        {
            string com = @"SELECT topic.topic_title, article.article_title, article.article_content, article.article_id
                           FROM topic 
                           INNER JOIN article ON topic.topic_id = article.topic_id
                           WHERE (((article.article_id)=[?]));";

            OdbcParameter[] queryParameters =
            {
                new OdbcParameter($"@article_id", articleId),
            };

            return UsersOdbcHelper.GetTable(com, queryParameters);
        }



        public static void DeleteArticle(int articleId)
        {
            string com = "DELETE FROM article WHERE article_id=?";

            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@article_id", articleId),
            };

            UsersOdbcHelper.Execute(com, queryParameters);
        }

        //Filter search requests
        public static DataTable GetAllArticlesBy(string tableToFilter, string filterValue)
        {
            string com = $@"SELECT article.article_content, article.article_title, article.topic_id, topic.topic_title, article.article_content, provider.provider_phone, provider.provider_full_name, provider.provider_email, provider.provider_occupation
                            FROM provider 
                            INNER JOIN (topic INNER JOIN article ON topic.topic_id = article.topic_id) 
                            ON provider.provider_id = article.provider_id
                            WHERE((({tableToFilter}) ALIKE ?));";


                //$"SELECT article.article_content, topic.topic_title, provider.provider_full_name, article.article_title, provider.provider_id " +
                //         $"FROM topic " +
                //         $"INNER JOIN(provider INNER JOIN article ON provider.provider_id = article.provider_id) " +
                //         $"ON topic.topic_id = article.topic_id " +
                //          $"WHERE((({tableToFilter}) ALIKE ?));";

            OdbcParameter[] queryParameters =
            {
                new OdbcParameter($"@{tableToFilter}", $"%{filterValue}%"),
            };

            return UsersOdbcHelper.GetTable(com, queryParameters);
        }

        public static DataTable GetAllArticlesByTopicName(string filterValue)
        {
            string com = "SELECT article.article_content, article.topic_name, provider.provider_full_name, article.article_title FROM provider INNER JOIN article ON provider.provider_id = article.provider_id WHERE(((article.topic_name) ALIKE ?));";

            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@article.topic_name", $"%{filterValue}%"),
            };

            return UsersOdbcHelper.GetTable(com, queryParameters);
        }
        public static DataTable GetAllArticles()
        {
            //string com = "SELECT article.article_content, provider.provider_full_name, article.article_title FROM provider INNER JOIN article ON provider.provider_id = article.provider_id";
            //            string com = @"SELECT article.article_title, article.topic_id, provider.provider_full_name, article.article_content, topic.topic_title
            //FROM provider INNER JOIN ((topic INNER JOIN article ON topic.topic_id = article.topic_id) INNER JOIN topic_to_game ON topic.topic_id = topic_to_game.topic_id) ON provider.provider_id = article.provider_id;";

            string com = @"SELECT article.article_content, article.article_title, article.topic_id, topic.topic_title, article.article_content, provider.provider_phone, provider.provider_full_name, provider.provider_email, provider.provider_occupation
                           FROM provider 
                           INNER JOIN (topic INNER JOIN article ON topic.topic_id = article.topic_id) 
                           ON provider.provider_id = article.provider_id;";

            return UsersOdbcHelper.GetTable(com, new OdbcParameter[0]);
        }


        public static void PostArticle(int providerId, int topicId, string content, string title)
        {
            string com = "INSERT INTO article (provider_id, topic_id, article_content, article_title) VALUES (?,?,?,?)";
            
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_id", providerId),
                new OdbcParameter("@topic_id", topicId),
                new OdbcParameter("@article_content", OdbcType.NText, 8000),
                new OdbcParameter("@article_title", title),
            };

            //  Set special size for long strings 
            queryParameters[2].Value = content;

            UsersOdbcHelper.Execute(com, queryParameters);
        }

        public static void CreateTopic(string topicName)
        {
            string com = "INSERT INTO topic (?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@topic_name", topicName),
            };

            UsersOdbcHelper.Execute(com, queryParameters);
        }

        public static DataTable GetAllTopics()
        {
            //string com = "SELECT topic_name, topic_id FROM topic";
            string com = "SELECT topic_title, topic_id FROM topic";
            return UsersOdbcHelper.GetTable(com, new OdbcParameter[0]);
        }

        public static bool IsTopicExists(string topicName)
        {
            string com = "SELECT topic_name FROM topic WHERE topic_name = ?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@topic_name", topicName),
            };

            DataTable topicDt = UsersOdbcHelper.GetTable(com, queryParameters);

            return topicDt.Rows.Count > 0;
        }

        public static void UpdateProviderInfo(int providerId, string providerName, string providerEmail, string providerOccupation, string providerPhoneNumber)
        {
            string com = @"UPDATE provider SET provider.provider_full_name = [?], provider.provider_email = [?], provider.provider_occupation = [?], provider.provider_phone = [?]
                           WHERE (((provider.provider_id)=[?]));";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@provider_full_name", providerName),
                new OdbcParameter("@provider_email", providerEmail),
                new OdbcParameter("@provider_occupation", providerOccupation),
                new OdbcParameter("@provider_phone", providerPhoneNumber),
                new OdbcParameter("@provider_id", providerId),
            };

            UsersOdbcHelper.Execute(com, queryParameters);

            
        }
    }
}
