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
            Console.WriteLine("Adding child...");
            Console.Write("child name: {0}\nchild age: {1}\n", UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Convert.FromBase64String(Request.Headers["childName"])), Request.Headers["childAge"]);
            
            //  Add child to database

            addedChild = true;

            return base.Content(JsonSerializer.Serialize(new { Confirmed = addedChild }), "application/json", System.Text.Encoding.UTF8);
        }

        private string Decode(string path)
        {
            // This StreamReader constructor defaults to UTF-8
            using StreamReader reader = new StreamReader(path);
            return reader.ReadToEnd();
        }
    }
}
