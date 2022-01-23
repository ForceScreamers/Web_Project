using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


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
			bool isAuth = JwtManager.IsTokenValid(Request.Headers["x-access-token"]);

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
			Console.WriteLine("TOKEN: "+ token);
			bool isTokenValid = false;
			if (token != "null")
			{
				isTokenValid = JwtManager.IsTokenValid(Request.Headers["x-access-token"]);
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

		
	}
}