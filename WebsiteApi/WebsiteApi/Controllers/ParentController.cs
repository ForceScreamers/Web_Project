using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

using ParentDal;

using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.IO;
using Newtonsoft.Json;
using System.Data;
using WMS.Models.VM;
using WebsiteApi.HelperClasses;
using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNet.WebApi.Core;

namespace WebsiteApi.Controllers
{
	[ApiController]
	//[EnableCors("CorsPolicy")]
	[Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]

	public class ParentController : Controller
	{
		#region -------------  HTTP functions  -------------

		// Puts a new user into the database
		// Returns is the register was successful or failed, returns if the user alreadt exists in the database
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("UserRegister")]
		public ContentResult UserRegister()
		{
			string parentUsername = Request.Headers["username"].ToString();
			string parentEmail = Request.Headers["email"].ToString();
			string parentPassword = Request.Headers["password"].ToString();

			Console.WriteLine("Registering parent: {0} {1} {2}", parentUsername, parentEmail, parentPassword);

			bool userRegistered = false;//  If the parent is registered in the system
			bool userExists = false;//  If the user already exists in the system

			if (ParentMethods.IsExists(parentEmail, parentPassword) == false)
			{
				int result = 0;

				try
				{
					//  Add parent to db
					result = ParentMethods.AddParent(parentUsername, parentEmail, parentPassword, DateTime.Today.ToString());
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

			return base.Content(JsonConvert.SerializeObject(new { Registered = userRegistered, UserExists = userExists }), "application/json", System.Text.Encoding.UTF8);
		}


		//	Checks if the user exists in the database
		//	Generates token for the user
		//	Returns information about the user
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("UserLogin")]
		public ContentResult UserLogin()
		{
			LoggedParent loggedParent = new LoggedParent();
			//  Get email and password from the request 
			Console.WriteLine("Email: " + Request.Headers["email"]);
			Console.WriteLine("Password: " + Request.Headers["password"]);


			//  Check if the email and password exist
			bool userExists = ParentMethods.IsExists(Request.Headers["email"], Request.Headers["password"]);
			Console.WriteLine("User exists: {0}", userExists);

			if (userExists)
			{
				//  Get the username and id
				loggedParent = ParentMethods.GetParentLoggedInfo(Request.Headers["email"], Request.Headers["password"]);

				//  Add the children that belong to this parent
				loggedParent.AddChildren(GetChildrenForParent(loggedParent.Id));
			}

			//TokenManager.GenerateToken(loggedParent.Username);
			return base.Content(JsonConvert.SerializeObject(new { ParentInfo = loggedParent, UserExists = userExists }));
			//  Return a json object containing the username, id and login confirmation
			//return base.Content(JsonConvert.SerializeObject(new { UserInfo = loggedParentInfo, Authenticated = userExists }), "application/json", System.Text.Encoding.UTF8);
		}

		//	Adds a new child to the database
		//	Returns if the child was added, and information about the child
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("AddChild")]
		public ContentResult AddChild()
		{
			Child newChild = new Child(ConvertToUnicode(Request.Headers["childName"]), int.Parse(Request.Headers["childAge"]));

			bool childAddConfirm = false;
			try
			{
				//  Add child to database
				newChild.Id = ChildMethods.AddChild(int.Parse(Request.Headers["parentId"]), int.Parse(Request.Headers["childAge"]), ConvertToUnicode(Request.Headers["childName"]));
				Console.Write("Added child, id: {0}", newChild.Id);

				childAddConfirm = true;
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
			}

			//	TODO: Check if you really need to return info
			return base.Content(JsonConvert.SerializeObject(new { confirmed = childAddConfirm, name = ConvertToUnicode(Request.Headers["childName"]), age = int.Parse(Request.Headers["childAge"]), id = newChild.Id }), "application/json", System.Text.Encoding.UTF8);
		}
		#endregion

		public List<Child> GetChildrenForParent(int parentId)
		{
			Console.WriteLine("Getting children for parent {0}", parentId);
			DataTable children = ChildMethods.GetChildrenForParent(parentId);

			children.Columns["child_name"].ColumnName = "name";
			children.Columns["child_id"].ColumnName = "id";
			children.Columns["child_age"].ColumnName = "age";
			children.Columns["child_is_selected"].ColumnName = "isSelected";

			//  Return children as a json object
			return ChildrenDataTableToObject(children);
		}
        //[Microsoft.AspNetCore.Mvc.HttpPost]
        //[Microsoft.AspNetCore.Mvc.ActionName("GetChildrenForParent")]
        //public ContentResult GetChildrenForParent()
        //{
        //    Console.WriteLine("Sending children...");
        //    DataTable children = ChildMethods.GetChildrenForParent(int.Parse(Request.Headers["parentId"]));
        //    children.Columns["child_name"].ColumnName = "name";
        //    children.Columns["child_id"].ColumnName = "id";
        //    children.Columns["child_age"].ColumnName = "age";
        //    children.Columns["child_is_selected"].ColumnName = "isSelected";

        //    //  Return children as a json object
        //    return base.Content(JsonConvert.SerializeObject(children), "application/json", Encoding.UTF8;
        //}

        private List<Child> ChildrenDataTableToObject(DataTable childrenDt)
		{
			List<Child> children = new List<Child>();

			foreach(DataRow row in childrenDt.Rows)
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

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("DeleteChild")]
		public ContentResult DeleteChild()
		{
			int childId = int.Parse(Request.Headers["childId"]);
			int parentId = int.Parse(Request.Headers["parentId"]);

			try
			{
				//	Delete child from database
				ChildMethods.DeleteChild(childId);

				//  If no child is selected, select the first one
				if (IsNoChildSelectedForParent(parentId))
				{
					ChildMethods.SelectChild(GetFirstChildId(parentId));
					Console.WriteLine("Switching child...");
				}
			}
			catch (Exception e) { Console.WriteLine(e); }
			finally
			{
				Console.WriteLine("Deleted child: " + childId);
			}

			//  Return the deleted child id
			return base.Content(JsonConvert.SerializeObject(new { DeletedChildId = childId }), "application/json", System.Text.Encoding.UTF8);
		}

		/// <summary>
		/// Returns true if no child is selected (for the given parent), false otherwise
		/// </summary>
		/// <param name="parentId"></param>
		/// <returns></returns>
		private bool IsNoChildSelectedForParent(int parentId)
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
		/// <param name="parentId"></param>
		/// <returns></returns>
		private int GetFirstChildId(int parentId)
		{
			return (int)ChildMethods.GetChildrenForParent(parentId).Rows[0]["child_id"];
		}

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("SelectChild")]
		public ContentResult SelectChild()
		{
			//  Selecting child 
			bool result = ChildMethods.SelectChild(int.Parse(Request.Headers["childId"]));
			Console.WriteLine(string.Format("Selecting child id: {0}... {1}", int.Parse(Request.Headers["childId"]), result ? "Success!" : "Failed"));

			return base.Content(JsonConvert.SerializeObject(new { IsSelected = result }), "application/json", Encoding.UTF8);
		}

		/// <summary>
		/// Converts a given UTF-8 encoded string to Unicode and returns unicode as string
		/// </summary>
		/// <param name="utf8text"></param>
		/// <returns></returns>
		private string ConvertToUnicode(string utf8text)
		{ return Encoding.Unicode.GetString(UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); }
	}
}