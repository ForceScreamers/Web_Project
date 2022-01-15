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
using ParentsApi.HelperClasses;

//	--- To remove ---
using Microsoft.AspNetCore.Cors;
using WebApi.Jwt;
using System.Security.Claims;
//using Microsoft.AspNet.WebApi.Core;

namespace ParentsApi.Controllers
{
	[ApiController]
	[Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]

	public class ParentController : Controller
	{
		#region -------------  HTTP functions  -------------
		
		// Puts a new user into the database
		// Returns is the register was successful or failed, returns if the user alreadt exists in the database
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("ParentRegister")]
		public ContentResult ParentRegister()
		{
			string result = ParentHelperFunctions.ParentRegister(Request.Headers["username"].ToString() ,Request.Headers["email"].ToString(), Request.Headers["password"].ToString());
			return base.Content(result);
		}

		//	Checks if the user exists in the database
		//	Returns information about the user
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("ParentLogin")]
		public ContentResult ParentLogin()
		{
			//string result = ;
			return base.Content(JsonConvert.SerializeObject(new
			{
				FromParent = ParentHelperFunctions.ParentLogin(Request.Headers["email"].ToString(), Request.Headers["password"].ToString()),
				token = AuthController.GetToken(Request.Headers["email"].ToString()),
			}));
		}

		


		//	Adds a new child to the database
		//	Returns if the child was added, and information about the child
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("AddChild")]
		public ContentResult AddChild()
		{

			Child child = new Child(Request.Headers["childName"].ToString(), int.Parse(Request.Headers["childAge"].ToString()));

			return base.Content(ParentHelperFunctions.AddChild(int.Parse(Request.Headers["parentId"].ToString()), child));
		}

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("DeleteChild")]
		public ContentResult DeleteChild()
		{
			return base.Content(ParentHelperFunctions.DeleteChild
				(
					int.Parse(Request.Headers["childId"].ToString()), 
					int.Parse(Request.Headers["parentId"].ToString()))
				);
		}

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("GetChildren")]
		public ContentResult GetChildren()
		{
			return base.Content(ParentHelperFunctions.GetChildren(int.Parse(Request.Headers["parentId"].ToString())));
		}

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("SelectChild")]
		public ContentResult SelectChild()
		{
			int parentId = int.Parse(Request.Headers["parentId"].ToString());
			int childId = int.Parse(Request.Headers["childId"].ToString());

			return base.Content(ParentHelperFunctions.SelectChild(childId, parentId));
		}
		#endregion



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

		

		/// <summary>
		/// Converts a given UTF-8 encoded string to Unicode and returns unicode as string
		/// </summary>
		/// <param name="utf8text"></param>
		/// <returns></returns>
		private string ConvertToUnicode(string utf8text)
		{ return Encoding.Unicode.GetString(UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); }
	}
}