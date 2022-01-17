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

namespace ParentsApi
{
    public class ParentHelperFunctions
    {
		public static string GetGames()
		{
			return JsonConvert.SerializeObject(GameMethods.GetGames());
		}
		public static void UpdateChildEvaluation(int childId, int gameId, int scoreToAdd)
        {
            try
            {

				if (EvaluationMethods.IsExists(childId, gameId))
				{

					EvaluationMethods.AddScoreToEvaluation(childId, scoreToAdd);
				}
				else
				{

					EvaluationMethods.AddEvaluation(childId, gameId, 0);
				}
			}
			catch(Exception err)
            {
				Console.WriteLine(err);
            }
        }
		public static string GetEvaluation(int parentId)
        {
			return JsonConvert.SerializeObject(EvaluationMethods.GetEvaluationsForParent(parentId));
        }


		//	TODO: Change return type to string and convert the result to string
		public static string SelectChild(int childId, int parentId)
		{
			//  Selecting child 
			bool result = ChildMethods.SelectChild(childId, parentId);
			Console.WriteLine(string.Format("Selecting child id: {0}... {1}", childId, result ? "Success!" : "Failed"));

			return JsonConvert.SerializeObject(new { IsSelected = result });
		}
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

			//  Return children as a json object
			return JsonConvert.SerializeObject(children);
		}
		public static string AddChild(int parentId, Child child)
		{
			bool childAddConfirm = false;
			try
			{
				//  Add child to database
				child.Id = ChildMethods.AddChild(parentId, child.Age, ConvertToUnicode(child.Name));
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
			return JsonConvert.SerializeObject(new { confirmed = childAddConfirm, name = ConvertToUnicode(child.Name), age = child.Age, id = child.Id});
		}
		public static object ParentLogin(string email, string password)
		{
			ParentInfo loggedParent = new ParentInfo();
			//  Get email and password from the request 
			//Console.WriteLine("Email: " + Request.Headers["email"]);
			//Console.WriteLine("Password: " + Request.Headers["password"]);


			//  Check if the email and password exist
			bool userExists = ParentMethods.IsExists(email, password);
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
			Console.WriteLine("Registering parent: {0} {1} {2}", username, email, password);

			bool userRegistered = false;//  If the parent is registered in the system
			bool userExists = false;//  If the user already exists in the system

			if (ParentMethods.IsExists(email, password) == false)
			{
				int result = 0;

				try
				{
					//  Add parent to db
					result = ParentMethods.AddParent(username, email, password, DateTime.Today.ToString());
				}
				catch (Exception e)
				{
					Console.WriteLine(e);
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



		private static List<Child> ChildrenDataTableToList(DataTable childrenDt)
		{
			List<Child> children = new List<Child>();

			foreach (DataRow row in childrenDt.Rows)
			{
				//  Convering child properties
				string childName = row.ItemArray[1].ToString();
				int childId = int.Parse(row.ItemArray[2].ToString());
				int childAge = int.Parse(row.ItemArray[0].ToString());
				bool childIsSelected = bool.Parse(row.ItemArray[3].ToString());

				children.Add(new Child(childName, childAge, childIsSelected, childId));
				Console.WriteLine(children[children.Count - 1].ToString());
			}

			return children;
		}
		private static string ConvertToUnicode(string utf8text)
		{ return Encoding.Unicode.GetString(UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); }

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

		
	}
}
