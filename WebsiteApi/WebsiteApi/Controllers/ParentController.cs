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
using WebsiteApi.HelperClasses;

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
            int loggedId = -1;
            string loggedUsername = "";
            object loggedParentInfo = null;
            //  Get email and password from the request 
            Console.WriteLine("Email: " + Request.Headers["email"]);
            Console.WriteLine("Password: " + Request.Headers["password"]);

            //Console.WriteLine(ParentMethods.AddParent("DummyUsername", Request.Headers["email"], Request.Headers["password"], DateTime.Now.ToString()));
            //"10/10/2000"

            bool userExists = false; 
            
            if(!Request.Headers["email"].ToString().Equals("") && !Request.Headers["password"].ToString().Equals(""))//  Just for debugging (Checking for empty strings)
            {
                //  Check if the email and password exist
                userExists = ParentMethods.IsExists(Request.Headers["email"], Request.Headers["password"]);
                Console.WriteLine("User exists: {0}", userExists);

                if (userExists)
                {
                    //TODO: Fix casting into logged parent class
                    // ---- Get the information of the logged in parent ----
                    loggedParentInfo = JsonConvert.SerializeObject(ParentMethods.GetParentLoggedInfo(Request.Headers["email"], Request.Headers["password"]));
                    
                    //LoggedParent loggedParent = loggedParentInfo.GetType().GetProperty("username").GetValue(loggedParentInfo);
                    //loggedId = loggedParent.ParentId;
                    //loggedUsername = loggedParent.ParentUsername;
                }
            }

            return base.Content((string)loggedParentInfo, "application/json", System.Text.Encoding.UTF8);
        }


        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetAddChildConfirmation")]
        public ContentResult GetAddChildConfirmation()
        {
            int newlyAddedId = -1;
            bool addedChild = false;
            try
            {

                Console.Write("Adding child... ");
                //  Add child to database
                newlyAddedId = ChildMethods.AddChild(int.Parse(Request.Headers["parentId"]), int.Parse(Request.Headers["childAge"]), ConvertToUnicode(Request.Headers["childName"]));

                addedChild = true;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }

            return base.Content(JsonConvert.SerializeObject(new { confirmed = addedChild, name = ConvertToUnicode(Request.Headers["childName"]), age = int.Parse(Request.Headers["childAge"]), id = newlyAddedId }), "application/json", System.Text.Encoding.UTF8);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetChildrenForParent")]
        public ContentResult GetChildrenForParent()
        {
            Console.WriteLine("Sending children...");
            DataTable children = ChildMethods.GetChildrenForParent(int.Parse(Request.Headers["parentId"]));
            children.Columns["child_name"].ColumnName = "name";
            children.Columns["child_id"].ColumnName = "id";
            children.Columns["child_age"].ColumnName = "age";




            //  Return children as a json object
            return base.Content(JsonConvert.SerializeObject(children), "application/json", Encoding.UTF8);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetDeleteChild")]
        public ContentResult GetDeleteChild()
        {
            int childId = int.Parse(Request.Headers["childId"]);

            try
            {
                ChildMethods.DeleteChild(int.Parse(Request.Headers["childId"]));
            }
            catch(Exception e) { Console.WriteLine(e); }
            finally
            {
                Console.WriteLine("Deleted child");
            }

            Console.WriteLine("Deleted child: " + childId);


            //  Return the deleted child id
            return base.Content(JsonConvert.SerializeObject(new { childId = childId }), "application/json", System.Text.Encoding.UTF8);

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
