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

namespace WebsiteApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]
    public class ParentController : Controller
    {
        //  Call AddParent from the helper class
        //int result = ParentMethods.AddParent("Username", "Email", "1234", "10/10/2000");



        //  TODO: Add a function that recives child information and adds it to the database, the function will return a confirmation that the child was added
        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetLoginConfirmation")]
        public ContentResult GetLoginConfirmation()
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

            return base.Content(JsonSerializer.Serialize(new { Confirmed = result }), "application/json", System.Text.Encoding.UTF8);
        }


        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetAddChildConfirmation")]
        public ContentResult GetAddChildConfirmation()
        {
            bool addedChild = false;
            try
            {

                Console.Write("Adding child... ");
                //  Add child to database
                Console.WriteLine( "return status: " + ChildMethods.AddChild(int.Parse(Request.Headers["parentId"]), int.Parse(Request.Headers["childAge"]), ConvertToUnicode(Request.Headers["childName"])));

                addedChild = true;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }

            return base.Content(JsonSerializer.Serialize(new { Confirmed = addedChild }), "application/json", System.Text.Encoding.UTF8);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetChildrenForParent")]
        public ContentResult GetChildrenForParent()
        {
            object children = ChildMethods.GetChildrenForParent(int.Parse(Request.Headers["parentId"]));

            //  Return children as a json object
            return base.Content(JsonSerializer.Serialize(children), "application/json", Encoding.UTF8);
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
