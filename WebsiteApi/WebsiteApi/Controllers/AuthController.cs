using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApi.Jwt;


namespace ParentsApi.Controllers
{
	[ApiController]
	[Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]
	public class AuthController : Controller
    {
		

		[Microsoft.AspNetCore.Mvc.HttpGet]
		[Microsoft.AspNetCore.Mvc.ActionName("GetNewToken")]
		public ContentResult GetNewToken()
		{
			bool isAuth = ValidateToken(Request.Headers["x-access-token"]);

			return base.Content(JsonConvert.SerializeObject(new
			{
				IsAuth = isAuth,
				NewToken = isAuth ? GetToken(Request.Headers["email"].ToString()) : null,
			}));
		}

		public static string GetToken(string email)
		{
			return JwtManager.GenerateToken(email);
		}


		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.ActionName("IsAuth")]
		public ContentResult IsAuth()
		{
			//object e = JwtManager.GetPrincipal(Request.Headers["x-access-token"]);
			//Console.WriteLine("Token:");
			//Console.WriteLine(Request.Headers["x-access-token"]);
			string token = Request.Headers["x-access-token"];
			bool isTokenValid = false;
			if (token != "null")
			{
				isTokenValid = ValidateToken(Request.Headers["x-access-token"]);
			}
			else
			{
				Console.WriteLine("NO TOKEN");
			}

			Console.WriteLine(isTokenValid);
			return base.Content(JsonConvert.SerializeObject(new 
			{
				IsAuth = isTokenValid 
			}));
		}

		private static bool ValidateToken(string token)
		{
			//username = null;
			Console.WriteLine(token);
			var simplePrinciple = JwtManager.GetPrincipal(token);
			var identity = simplePrinciple.Identity as ClaimsIdentity;

			if (identity == null || !identity.IsAuthenticated)
				return false;

			//var usernameClaim = identity.FindFirst(ClaimTypes.Name);
			//username = usernameClaim?.Value;

			//if (string.IsNullOrEmpty(username))
			//	return false;

			// More validate to check whether username exists in system

			return true;
		}
	}
}