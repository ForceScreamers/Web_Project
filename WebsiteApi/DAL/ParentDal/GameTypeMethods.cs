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
    class GameTypeMethods
    {

        //  GOOD
        public static int AddGameType(string gameTypeDescription)
        {
            string com = "INSERT INTO game_type (game_type_description) VALUES (?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@game_type_description", gameTypeDescription),
            };

            return ParentOdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteGameType(int gameTypeId)
        {
            string com = "DELETE FROM game_type WHERE game_type_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@game_type_id", gameTypeId),
            };

            return ParentOdbcHelper.Execute(com, queryParameters);
        }
    }
}
