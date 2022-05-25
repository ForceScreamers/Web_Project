using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ParentDal;
using ParentsApi.HelperClasses;

using Newtonsoft.Json;
using System.Data;
using System.Text;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace ParentsApi
{
    public class ParentHelperFunctions
    {
		public static void UpdateChildEvaluation(int childId, int gameId, int moveCount, int timeInSeconds, int score, int difficulty)
        {
            try
            {
				//If the evaluation exists
				if (EvaluationMethods.IsExists(childId, gameId, difficulty))
				{
					EvaluationMethods.UpdateEvaluation(childId, moveCount, timeInSeconds, score);
				}
				else
				{
					EvaluationMethods.AddEvaluation(childId, gameId, moveCount, timeInSeconds, score, difficulty);
				}
			}
			catch(Exception err)
            {
				Console.WriteLine(err);
            }
        }

		//	User functions
		public static object ParentLogin(string email, string password)
		{
			Parent loggedParent = new Parent();
			//  Get email and password from the request 
			//Console.WriteLine("Email: " + Request.Headers["email"]);
			//Console.WriteLine("Password: " + Request.Headers["password"]);


			//  Check if the email and password exist
			bool userExists = ParentMethods.IsRegistered(email, password);


			Console.WriteLine("User exists: {0}", userExists);

			if (userExists)
			{
				//  Get the username and id
				loggedParent = ParentMethods.GetParentLoggedInfo(email, password);

				//  Add the children that belong to this parent
				loggedParent.AddChildren(GetChildrenForParent(loggedParent.Id));
			}

			//	TODO: Return username, id and children 
			JsonResult result = new JsonResult(new { ParentInfo = loggedParent, UserExists = userExists });
			return result.Value;
		}
		public static string ParentRegister(string username, string email, string password)
		{
			bool userRegistered = false;//  If the parent is registered in the system
			bool userExists = false;//  If the user already exists in the system

			if (ParentMethods.IsExists(email) == false)
			{
				int result = 0;

				try
				{
					//  Add parent to db
					result = ParentMethods.AddParent(username, email, password, DateTime.Today.ToString());
				}
				catch (Exception e)
				{
					//	Do nothing
				}

				//  If there are no errors, the parent is registered
				userRegistered = (result == 1);
			}
			else
			{
				//  The user already exists
				userExists = true;
				Console.WriteLine("User exists");
			}

			return JsonConvert.SerializeObject(
				new
				{
					Registered = userRegistered,
					UserExists = userExists,
					Children = userRegistered
							? GetChildrenForParent(ParentMethods.GetParentLoggedInfo(email, password).Id)
							: null,
				});
		}


		//	TODO: Change return type to string and convert the result to string
		public static string SelectChild(int childId, int parentId)
		{
			//  Selecting child 
			bool result = ChildMethods.SelectChild(childId, parentId);
			Console.WriteLine(string.Format("Selecting child id: {0}... {1}", childId, result ? "Success!" : "Failed"));

			return JsonConvert.SerializeObject(new { IsSelected = result });
		}

		
		//	Child functions
		public static string DeleteChild(int childId, int parentId)
		{
			try
			{
				//	Delete child from database
				ChildMethods.DeleteChild(childId);

				//  If no child is selected, select the first one
				if (GetChildrenForParent(parentId).Count > 0 && IsNoChildSelectedForParent(parentId))
				{
					ChildMethods.SelectChild(GetFirstChildId(parentId), parentId);
					Console.WriteLine("Switching child...");
				}
			}
			catch (Exception e) { Console.WriteLine(e); }
			finally
			{
				Console.WriteLine("Deleted child: " + childId);
			}

			//  Return the deleted child id
			return JsonConvert.SerializeObject(new { DeletedChildId = childId });

		}
		public static string GetChildren(int parentId)
		{

			List<Child> children = GetChildrenForParent(parentId);

			//  If no child is selected, select the first one
			if (children.Count > 0 && IsNoChildSelectedForParent(parentId))
			{
				ChildMethods.SelectChild(GetFirstChildId(parentId), parentId);
				children = GetChildrenForParent(parentId);
				Console.WriteLine("Switching child...");
			}

			AddEvaluationsToChildren(children);
			
			//  Return children as a json object
			return JsonConvert.SerializeObject(children);
		}

		/// <summary>
		/// Adds all of the children's evaluations, each to it's matching child
		/// </summary>
		private static void AddEvaluationsToChildren(List<Child> children)
		{
			foreach (Child child in children)
			{
				List<Evaluation> childEvaluations = GetEvaluationsForChild(child.Id);
				child.AddEvaluations(childEvaluations);
			}
		}
		public static string AddChild(int parentId, Child child)
		{
			bool childAddConfirm = false;
			try
			{
				//  Add child to database
				child.Id = ChildMethods.AddChild(parentId, child.Age, UnicodeHelper.ConvertToUnicode(child.Name));
				Console.Write("Added child, id: {0}", child.Id);

				childAddConfirm = true;

				//  If no child is selected, select the first one
				if (IsNoChildSelectedForParent(parentId))
				{
					ChildMethods.SelectChild(GetFirstChildId(parentId), parentId);
					Console.WriteLine("Switching child...");
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
			}
			
			//	TODO: Check if you really need to return info
			return JsonConvert.SerializeObject(new { confirmed = childAddConfirm, name = UnicodeHelper.ConvertToUnicode(child.Name), age = child.Age, id = child.Id});
		}

		/// <summary>
		/// Returns true if no child is selected (for the given parent), false otherwise
		/// </summary>
		private static bool IsNoChildSelectedForParent(int parentId)
		{
			DataTable children = ChildMethods.GetChildrenForParent(parentId);
			bool isSelected = false;

			Console.WriteLine("All children ids");

			//  Iterate through children
			foreach (DataRow row in children.Rows)
			{
				Console.WriteLine((int)row["child_id"]);
				if ((bool)row["child_is_selected"])//If the child is selected
				{
					isSelected = true;
				}
			}

			return !isSelected;
		}

		/// <summary>
		/// Returns the id of the first child to the given parent
		/// </summary>
		private static int GetFirstChildId(int parentId)
		{

			return (int)ChildMethods.GetChildrenForParent(parentId).Rows[0]["child_id"];
		}

		public static void UpdateChildInfo(int childId, string childName, int childAge)
		{
			ChildMethods.UpdateChildInfo(childId, childName, childAge);
		}


		private static List<Evaluation> GetEvaluationsForChild(int childId)
		{
			DataTable evaluationsDt = EvaluationMethods.GetEvaluationsForChild(childId);
			return EvaluationsDataTableToList(evaluationsDt);
		}
		private static List<Child> GetChildrenForParent(int parentId)
		{
			DataTable childrenDt = ChildMethods.GetChildrenForParent(parentId);
			List<Child> childrenList = ChildrenDataTableToList(childrenDt);
			//	TODO: CHECK IF NEEDED \/ \/
			//childrenDt.Columns["child_name"].ColumnName = "name";
			//childrenDt.Columns["child_id"].ColumnName = "id";
			//childrenDt.Columns["child_age"].ColumnName = "age";
			//childrenDt.Columns["child_is_selected"].ColumnName = "isSelected";

			return childrenList;
		}

		//TODO: Change these to use the class ConvertDataTable instead of each function instance
		private static List<Evaluation> EvaluationsDataTableToList(DataTable evaluationsDt)
		{
			List<Evaluation> evaluations = new List<Evaluation>();

			foreach (DataRow row in evaluationsDt.Rows)
			{
				//  Convering properties
				string gameName = row.ItemArray[0].ToString();
				float averageScore = float.Parse(row.ItemArray[2].ToString());
				float averageTime = float.Parse(row.ItemArray[3].ToString());
				float averageMoveCount = float.Parse(row.ItemArray[4].ToString());
				string difficulty = row.ItemArray[5].ToString();
				int lowestTime = int.Parse(row.ItemArray[6].ToString());
				int lowestMoves = int.Parse(row.ItemArray[7].ToString());



				evaluations.Add(new Evaluation(averageScore, averageTime, averageMoveCount, difficulty, lowestTime, lowestMoves, gameName));
			}

			return evaluations;
		}
		private static List<Child> ChildrenDataTableToList(DataTable childrenDt)
		{
			List<Child> children = new List<Child>();

			foreach (DataRow row in childrenDt.Rows)
			{
				//  Convering properties
				string childName = row.ItemArray[1].ToString();
				int childId = int.Parse(row.ItemArray[2].ToString());
				int childAge = int.Parse(row.ItemArray[0].ToString());
				bool childIsSelected = bool.Parse(row.ItemArray[3].ToString());

				children.Add(new Child(childName, childAge, childIsSelected, childId));
				Console.WriteLine(children[children.Count - 1].ToString());
			}

			return children;
		}
		private static List<Game> GamesDataTableToList(DataTable gamesDt)
		{
			List<Game> games = new List<Game>();

			foreach (DataRow row in gamesDt.Rows)
			{
				//  Convering properties
				string gameName = row.ItemArray[0].ToString();
				string gameDescription = row.ItemArray[1].ToString();
				int gameId = int.Parse(row.ItemArray[2].ToString());
				string gameTopic = row.ItemArray[3].ToString();

				//	Create topics list with a single item
				List<string> topic = new List<string>();
				topic.Add(gameTopic);

				games.Add(new Game(gameId, gameName, gameDescription, topic));
			}

			List<Game> combinedGames = CombineGameTopicsLists(games);

			return combinedGames;
		}


		//	Returns a new list which containes new game objects with all of the matching game subjects/topics
		private static List<Game> CombineGameTopicsLists(List<Game> games)
		{
			List<Game> combinedGames = new List<Game>();

			foreach(Game game in games)
			{
				if (IsGameExistsInList(game, combinedGames))
				{
					//	Add topics to same game inside combined topics list
					combinedGames[GetIndexOfSameGame(game, combinedGames)].Topics.Add(game.Topics[0]);
				}
				else
				{
					combinedGames.Add(game);
				}
			}

			return combinedGames;
		}

		private static bool IsGameExistsInList(Game isExistGame, List<Game> games)
		{
			foreach(Game game in games)
			{
				if(game.Id == isExistGame.Id)
				{
					return true;
				}
			}
			return false;
		}
		private static int GetIndexOfSameGame(Game gameToCheck, List<Game> games)
		{
			int index = 0;
			foreach (Game game in games)
			{
				if (game.Id == gameToCheck.Id)
				{
					return index;
				}
				index++;
			}
			return -1;
		}

		//	Games functions
		public static List<int> GetGameIdsByTopicId(int topicId)
		{
			DataTable gameIdsDataTable = GameMethods.GetGameIdsByTopicId(topicId);
			List<int> gameIds = new List<int>();

			foreach (DataRow row in gameIdsDataTable.Rows)
			{
				//  Convering properties
				int gameId = int.Parse(row.ItemArray[0].ToString());
				
				gameIds.Add(gameId);
			}

			return gameIds;
		}
		public static string GetTopicIdsByGameId(int gameId)
		{
			return null;
		}
		public static string GetGames()
		{
			DataTable gamesDt = GameMethods.GetGames();
			List<Game> games = GamesDataTableToList(gamesDt);


			return JsonConvert.SerializeObject(games);
		}
	}

	//class ConvertDataTable
	//{
	//	public static List<T> GetListFromDataTable<T>(DataTable dt)
	//	{
	//		List<T> data = new List<T>();
	//		foreach (DataRow row in dt.Rows)
	//		{
	//			T item = GetItem<T>(row);
	//			data.Add(item);
	//		}
	//		return data;
	//	}
	//	private static T GetItem<T>(DataRow dr)
	//	{
	//		Type temp = typeof(T);
	//		T obj = Activator.CreateInstance<T>();

	//		foreach (DataColumn column in dr.Table.Columns)
	//		{
	//			foreach (PropertyInfo pro in temp.GetProperties())
	//			{
	//				if (pro.Name == column.ColumnName)
	//					pro.SetValue(obj, dr[column.ColumnName], null);
	//				else
	//					continue;
	//			}
	//		}
	//		return obj;
	//	}
	//}

	
}


