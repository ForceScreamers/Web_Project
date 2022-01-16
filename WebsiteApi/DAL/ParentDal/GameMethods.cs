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

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteGame(int gameId)
        {
            string com = "DELETE FROM game WHERE game_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@game_id", gameId)
            };
            return OdbcHelper.Execute(com, queryParameters);
        }

        public static DataTable GetGames()
        {
            return OdbcHelper.GetTable("SELECT * FROM game", new OdbcParameter[0]);
        }
    }
}
