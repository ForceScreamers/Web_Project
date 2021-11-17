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
    class EvaluationMethods
    {
        //  GOOD
        public static int AddEvaluation(int evaluationChildId, int evaluationGameId)
        {
            string com = "INSERT INTO evaluation (evaluation_child_id, evaluation_game_id) VALUES (?, ?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_game_id", evaluationGameId),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int DeleteEvaluation(int evaluationChildId, int evaluationGameId)
        {
            string com = "DELETE FROM evaluation WHERE evaluation_child_id=? AND evaluation_game_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_game_id", evaluationGameId),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }

        public static bool IsExists(int evaluationChildId, int evaluationGameId)
        {
            string com = "SELECT evaluation_child_id, evaluation_game_id FROM evaluation WHERE evaluation_child_id=? AND evaluation_game_id=?";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_game_id", evaluationGameId)
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
