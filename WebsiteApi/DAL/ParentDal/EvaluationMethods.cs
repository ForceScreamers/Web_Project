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
        public static DataTable GetEvaluationsForChild(int childId)
        {
            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@child_id", childId)
            };


            string command = @"SELECT game.game_name, child.child_id,
                            evaluation.evaluation_average_score, 
                            evaluation.evaluation_average_time, 
                            evaluation.evaluation_average_moves, 
                            evaluation.evaluation_difficulty, 
                            evaluation.evaluation_lowest_time, 
                            evaluation.evaluation_lowest_moves
                            FROM game INNER JOIN (child INNER JOIN evaluation ON child.child_id = evaluation.evaluation_child_id) ON game.game_id = evaluation.evaluation_game_id
                            WHERE (((child.child_id)=[?]));";
            return ParentOdbcHelper.GetTable(command, queryParameters);
        }



        public static int AddEvaluation(int evaluationChildId, int evaluationGameId, int moveCount, int timeInSeconds, int score, int difficulty)
        {
            string com = "INSERT INTO evaluation (evaluation_child_id, evaluation_game_id, " +
                "evaluation_average_moves, evaluation_average_time, " +
                "evaluation_average_score, evaluation_lowest_time, " +
                "evaluation_lowest_moves, evaluation_difficulty) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_game_id", evaluationGameId),

                new OdbcParameter("@evaluation_average_moves", moveCount),
                new OdbcParameter("@evaluation_average_time", timeInSeconds),
                new OdbcParameter("@evaluation_average_score", score),

                new OdbcParameter("@evaluation_lowest_time", timeInSeconds),
                new OdbcParameter("@evaluation_lowest_moves", moveCount),

                new OdbcParameter("@evaluation_difficulty", difficulty),
            };

            return ParentOdbcHelper.Execute(com, queryParameters);
        }



        public static int UpdateEvaluation(int evaluationChildId, int moveCount, int timeInSeconds, int score)
        {

            string command = "UPDATE evaluation SET " +
                $"evaluation_average_score = (evaluation_average_score + {score}) / 2, " +
                $"evaluation_average_moves = (evaluation_average_moves + {moveCount}) / 2, " +
                $"evaluation_average_time = (evaluation_average_time + {timeInSeconds}) / 2, " +

                $"evaluation_lowest_time = IIF(evaluation_lowest_time > {timeInSeconds}, {timeInSeconds}, evaluation_lowest_time ), " +
                $"evaluation_lowest_moves = IIF(evaluation_lowest_moves > {moveCount}, {moveCount}, evaluation_lowest_moves ) " +

                //$"evaluation_lowest_time = CASE WHEN evaluation_lowest_time > {timeInSeconds} THEN {timeInSeconds} ELSE evaluation_lowest_time END, " +
                //$"evaluation_lowest_moves = CASE WHEN evaluation_lowest_moves > {moveCount} THEN {moveCount} ELSE evaluation_lowest_moves END " +

                "WHERE evaluation_child_id = ?";

            OdbcParameter[] queryParameters =
            {
                new OdbcParameter("@evaluation_child_id", evaluationChildId)
            };

            return ParentOdbcHelper.Execute(command, queryParameters);
        }



        public static int DeleteEvaluation(int evaluationChildId, int evaluationGameId)
        {
            string com = "DELETE FROM evaluation WHERE evaluation_child_id=? AND evaluation_game_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_game_id", evaluationGameId),
            };

            return ParentOdbcHelper.Execute(com, queryParameters);
        }



        public static bool IsExists(int evaluationChildId, int evaluationGameId, int difficulty)
        {
            string com = "SELECT evaluation_child_id, evaluation_game_id FROM evaluation WHERE evaluation_child_id=? AND evaluation_game_id=? AND evaluation_difficulty=?";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@evaluation_child_id", evaluationChildId),
                new OdbcParameter("@evaluation_game_id", evaluationGameId),
                new OdbcParameter("@evaluation_difficulty", difficulty),
            };

            //Add if check for existing users
            DataTable dt = ParentOdbcHelper.GetTable(com, queryParameters);

            if (dt.Rows.Count > 0)
            {
                exists = true;
            }

            return exists;
        }
    }
}
