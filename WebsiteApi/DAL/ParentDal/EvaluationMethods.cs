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
    public class EvaluationMethods
    {
        public static DataTable GetEvaluationsForParent(int parentId)
        {
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@parent_id", parentId)
            };

            return OdbcHelper.GetTable("SELECT evaluation... FROM evaluation WHERE parent_id=?", queryParameters);
        }

        //  GOOD
        public static int AddEvaluation(int evaluationChildId, int evaluationGameId, int evaluationScore)
        {
            string com = "INSERT INTO evaluation (evaluation_child_id, evaluation_game_id, evaluation_score) VALUES (?, ?, ?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_score", evaluationScore),
                new OdbcParameter("@evaluation_game_id", evaluationGameId),
            };

            return OdbcHelper.Execute(com, queryParameters);
        }
        public static int AddScoreToEvaluation(int evaluationChildId, int scoreToAdd)
        {
            string command = string.Format("UPDATE evaluation SET evaluation_score = evaluation_score + {0} WHERE evaluation_child_id = ?", scoreToAdd);

            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@evaluation_child_id", evaluationChildId)
            };

            return OdbcHelper.Execute(command, queryParameters);
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
