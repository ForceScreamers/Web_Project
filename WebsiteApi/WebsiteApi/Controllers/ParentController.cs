using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

using ParentDal;

using System.Net.Http;
using System.Web.Http;

namespace WebsiteApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class ParentController : Controller
    {
        //  Call AddParent from the helper class
        //int result = ParentMethods.AddParent("Username", "Email", "1234", "10/10/2000");



        //  TODO: Add a function that recives child information and adds it to the database, the function will return a confirmation that the child was added
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public ContentResult Get()
        {
            //  Get email and password from the request 
            Console.WriteLine("Email: " + Request.Headers["email"]);
            Console.WriteLine("Password: " + Request.Headers["password"]);
            //Console.WriteLine(ParentMethods.AddParent("DummyUsername", Request.Headers["email"], Request.Headers["password"], DateTime.Now.ToString()));
            //"10/10/2000"

            bool result = false; 
            
            if(!Request.Headers["email"].ToString().Equals("") && !Request.Headers["password"].ToString().Equals(""))//  Just for debugging (Checking for empty strings)
            {
                //  Check if the email and password exist
                result = ParentMethods.IsExists(Request.Headers["email"], Request.Headers["password"]);
                Console.WriteLine("User exists: {0}", result);
            }

            return base.Content(JsonSerializer.Serialize(new { Authenticated = result }), "application/json", System.Text.Encoding.UTF8);
        }
    }
}
