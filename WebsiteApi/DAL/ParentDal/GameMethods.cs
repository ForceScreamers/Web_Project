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
    public class GameMethods
    {

        //  GOOD
        public static int AddGame(int gameTypeId, string gameDescription, string gameLink)
        {
            string com = "INSERT INTO game (game_type_id, game_description, game_link) VALUES (?, ?)";

            OdbcParameter[] queryParameters = { 
                new OdbcParameter("@game_type_id", gameTypeId), 
                new OdbcParameter("@game_description", gameDescription), 
                new OdbcParameter("@game_link", gameLink), 
            };

            return UsersOdbcHelper.Execute(com, queryParameters);
        }

        public static int DeleteGame(int gameId)
        {
            string com = "DELETE FROM game WHERE game_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@game_id", gameId)
            };
            return UsersOdbcHelper.Execute(com, queryParameters);
        }

        public static DataTable GetGames()
        {
            return UsersOdbcHelper.GetTable(@"SELECT game.game_name, game.game_description, game.game_id, topic.topic_title
FROM topic INNER JOIN (game INNER JOIN topic_to_game ON game.game_id = topic_to_game.game_id) ON topic.topic_id = topic_to_game.topic_id;
"
            , new OdbcParameter[0]);
        }

        public static DataTable GetGameIdsByTopicId(int topicId)
        {
            string com = @"SELECT game.game_id, topic.topic_id 
                                                FROM game 
                                                INNER JOIN(topic INNER JOIN topic_to_game ON topic.topic_id = topic_to_game.topic_id) 
                                                ON game.game_id = topic_to_game.game_id 
                                                WHERE(((topic.topic_id) =[?]));";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@topic_id", topicId)
            };

            return UsersOdbcHelper.GetTable(com, queryParameters);
        }
    }
}
