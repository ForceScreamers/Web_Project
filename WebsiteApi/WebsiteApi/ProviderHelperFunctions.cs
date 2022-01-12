using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ProviderDal; 
using Newtonsoft.Json;
using System.Data;
using System.Text;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Provider_DAL;

namespace ProvidersApi
{
	public class ProviderHelperFunctions
	{
		public static string DeletePost(int postId, int providerId)
		{
			//try
			//{
			//	//	Delete post from database
			//	PostMethods.DeletePost(postId);
			//}
			//catch (Exception e) { Console.WriteLine(e); }
			//finally
			//{
			//	Console.WriteLine("Deleted child: " + postId);
			//}

			////  Return the deleted post id
			//return JsonConvert.SerializeObject(new { DeletedChildId = postId });
			return null;
		}
		public static string GetPosts(int providerId)
		{

			//List<Post> children = GetChildrenForParent(providerId);

			////  If no child is selected, select the first one
			//if (children.Count > 0 && IsNoChildSelectedForParent(providerId))
			//{
			//	ChildMethods.SelectChild(GetFirstChildId(providerId), providerId);
			//	Console.WriteLine("Switching child...");
			//}

			////  Return children as a json object
			//return JsonConvert.SerializeObject(children);
			return null;
		}
		public static string AddPost(int providerId, Post post)
		{
			//bool childAddConfirm = false;
			//try
			//{
			//	//  Add child to database
			//	child.Id = ChildMethods.AddChild(parentId, child.Age, ConvertToUnicode(child.Name));
			//	PostMethods.AddPost(providerId, )
			//	Console.Write("Added child, id: {0}", child.Id);

			//	childAddConfirm = true;
			//}
			//catch (Exception e)
			//{
			//	Console.WriteLine(e);
			//}

			////	TODO: Check if you really need to return info
			//return JsonConvert.SerializeObject(new { confirmed = childAddConfirm, name = ConvertToUnicode(child.Name), age = child.Age, id = child.Id });
			return null;
		}

		public static string ProviderLogin(string email, string password)
		{
			//  Check if the email and password exist
			bool userExists = false;

			try
			{
				userExists = ProviderMethods.IsExists(email, password);
			}
			catch(Exception e)
			{
				Console.WriteLine(e);
			}
			finally	//For debugging
			{
				Console.WriteLine("User exists: {0}", userExists);
			}
			
			return JsonConvert.SerializeObject(new { UserExists = userExists });
		}
		public static string ProviderRegister(string username, string email, string password)
		{
			//Console.WriteLine("Registering parent: {0} {1} {2}", username, email, password);

			//bool userRegistered = false;//  If the parent is registered in the system
			//bool userExists = false;//  If the user already exists in the system

			//if (ParentMethods.IsExists(email, password) == false)
			//{
			//	int result = 0;

			//	try
			//	{
			//		//  Add parent to db
			//		result = ParentMethods.AddParent(username, email, password, DateTime.Today.ToString());
			//	}
			//	catch (Exception e)
			//	{
			//		Console.WriteLine(e);
			//	}

			//	//  If there are no errors, the parent is registered
			//	userRegistered = (result == 1);
			//}
			//else
			//{
			//	//  The user already exists
			//	userExists = true;
			//	Console.WriteLine("User exists");
			//}

			//return JsonConvert.SerializeObject(
			//	new
			//	{
			//		Registered = userRegistered,
			//		UserExists = userExists,
			//		Children = userRegistered
			//				? GetChildrenForParent(ParentMethods.GetParentLoggedInfo(email, password).Id)
			//				: null,
			//	});
			return null;
		}



		private static List<Post> ChildrenDataTableToObject(DataTable childrenDt)
		{
			//List<Child> children = new List<Child>();

			//foreach (DataRow row in childrenDt.Rows)
			//{
			//	//  Convering child properties
			//	string childName = row.ItemArray[1].ToString();
			//	int childId = int.Parse(row.ItemArray[2].ToString());
			//	int childAge = int.Parse(row.ItemArray[0].ToString());
			//	bool childIsSelected = bool.Parse(row.ItemArray[3].ToString());

			//	children.Add(new Child(childName, childAge, childIsSelected, childId));
			//	Console.WriteLine(children[children.Count - 1].ToString());
			//}

			//return children;
			return null;
		}
		private static string ConvertToUnicode(string utf8text)
		{ return Encoding.Unicode.GetString(UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); }

		/// <summary>
		/// Returns true if no child is selected (for the given parent), false otherwise
		/// </summary>
		private static bool IsNoChildSelectedForParent(int parentId)
		{
			//DataTable children = PostMethods.GetChildrenForParent(parentId);
			//bool isSelected = false;

			//Console.WriteLine("All children ids");

			////  Iterate through children
			//foreach (DataRow row in children.Rows)
			//{
			//	Console.WriteLine((int)row["child_id"]);
			//	if ((bool)row["child_is_selected"])//If the child is selected
			//	{
			//		isSelected = true;
			//	}
			//}

			//return !isSelected;
			return false;
		}

		private static List<Post> GetPostsForProvider(int providerId)
		{
			DataTable childrenDt = PostMethods.GetPostsForProvider(providerId);
			//List<Post> childrenList = ChildrenDataTableToObject(childrenDt);

			//	TODO: CHECK IF NEEDED \/ \/
			//childrenDt.Columns["child_name"].ColumnName = "name";
			//childrenDt.Columns["child_id"].ColumnName = "id";
			//childrenDt.Columns["child_age"].ColumnName = "age";
			//childrenDt.Columns["child_is_selected"].ColumnName = "isSelected";

			return null;
		}
	}
}
