using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ParentsApi.HelperFunctions;

namespace ParentsApi.Controllers
{
	[ApiController]
	[Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]
	public class AdminController : Controller
    {

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("ConfirmProvider")]
		public ContentResult ConfirmProvider()
		{
			//	Get provider id
			int providerId = int.Parse(Request.Headers["providerId"].ToString());

			//	Toggle status to the provider
			AdminHelperFunctions.ConfirmProvider(providerId);

			return base.Content(null);
		}
	}
}