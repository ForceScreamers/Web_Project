using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

using ProviderDal;

using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.IO;
using Newtonsoft.Json;
using System.Data;
using WMS.Models.VM;

//	--- To remove ---
using Microsoft.AspNetCore.Cors;
using ProvidersApi;
using Provider_DAL;
//using Microsoft.AspNet.WebApi.Core;

namespace ParentsApi.Controllers
{
	[ApiController]
	[Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]

	public class ProviderController : Controller
	{
		#region -------------  HTTP functions  -------------

		// Puts a new user into the database
		// Returns is the register was successful or failed, returns if the user alreadt exists in the database
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("ProviderRegister")]
		public ContentResult ProviderRegister()
		{
			string result = ProviderHelperFunctions.ProviderRegister(Request.Headers["username"].ToString(), Request.Headers["email"].ToString(), Request.Headers["password"].ToString());

			return base.Content(result);
		}

		//	Checks if the user exists in the database
		//	Returns information about the user
		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("UserLogin")]
		public ContentResult UserLogin()
		{
			string userType = Request.Headers["userType"].ToString();
			string result = JsonConvert.SerializeObject("NO USER TYPE");

			if (userType == "parent")
				result = ProviderHelperFunctions.ProviderLogin(Request.Headers["email"].ToString(), Request.Headers["password"].ToString());

			return base.Content(result);
		}

		//	Adds a new child to the database
		//	Returns if the child was added, and information about the child
		//[Microsoft.AspNetCore.Mvc.HttpPost]
		//[Microsoft.AspNetCore.Mvc.ActionName("AddPost")]
		//public ContentResult AddChild()
		//{

		//	//Post child = new Post(Request.Headers["childName"].ToString(), int.Parse(Request.Headers["childAge"].ToString()));

		//	return base.Content(ProviderHelperFunctions.AddPost();

		//}

		//[Microsoft.AspNetCore.Mvc.HttpPost]
		//[Microsoft.AspNetCore.Mvc.ActionName("DeleteChild")]
		//public ContentResult DeletePost()
		//{
		//	return base.Content(ProviderHelperFunctions.DeleteChild
		//		(
		//			int.Parse(Request.Headers["childId"].ToString()),
		//			int.Parse(Request.Headers["parentId"].ToString()))
		//		);
		//}

		//[Microsoft.AspNetCore.Mvc.HttpPost]
		//[Microsoft.AspNetCore.Mvc.ActionName("GetChildren")]
		//public ContentResult GetPosts()
		//{
		//	return base.Content(ProviderHelperFunctions.GetChildren(int.Parse(Request.Headers["parentId"].ToString())));
		//}
		#endregion



		//private List<Child> ChildrenDataTableToObject(DataTable childrenDt)
		//{
		//	List<Child> children = new List<Child>();

		//	foreach (DataRow row in childrenDt.Rows)
		//	{
		//		//  Convering child properties
		//		string childName = row.ItemArray[1].ToString();
		//		int childId = int.Parse(row.ItemArray[2].ToString());
		//		int childAge = int.Parse(row.ItemArray[0].ToString());
		//		bool childIsSelected = bool.Parse(row.ItemArray[3].ToString());

		//		children.Add(new Child(childName, childAge, childIsSelected, childId));
		//		Console.WriteLine(children[children.Count - 1].ToString());
		//	}

		//	return children;
		//}



		/// <summary>
		/// Converts a given UTF-8 encoded string to Unicode and returns unicode as string
		/// </summary>
		/// <param name="utf8text"></param>
		/// <returns></returns>
		private string ConvertToUnicode(string utf8text)
		{ return Encoding.Unicode.GetString(UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); }
	}
}