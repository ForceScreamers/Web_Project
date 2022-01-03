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

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.ActionName("GetRegisterConfirmation")]
        public ContentResult GetRegisterConfirmation()
        {
            string parentUsername = Request.Headers["username"].ToString();
            string parentEmail = Request.Headers["email"].ToString();
            string parentPassword = Request.Headers["password"].ToString();

            Console.WriteLine("Registering parent: {0} {1} {2}", parentUsername, parentEmail, parentPassword);

            bool userRegistered = false;//  If the parent is registered in the system
            bool userExists = false;//  If the user already exists in the system


            if (ParentMethods.IsExists(Request.Headers["email"], Request.Headers["password"]) == false)
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
                userRegistered = (result == 0);
            }
            else
            {
                //  The user already exists
                userExists = true;
                Console.WriteLine("User exists");

            }

            return base.Content(JsonConvert.SerializeObject(new { Registered = userRegistered, Exists = userExists }), "application/json", System.Text.Encoding.UTF8);
        }



        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetLoginConfirmation")]
        //  Change request to post, here and server side
        public ContentResult GetLoginConfirmation()
        {
            object loggedParentInfo = null;
            //  Get email and password from the request 
            Console.WriteLine("Email: " + Request.Headers["email"]);
            Console.WriteLine("Password: " + Request.Headers["password"]);

            bool userExists = false;


            //  Check if the email and password exist
            userExists = ParentMethods.IsExists(Request.Headers["email"], Request.Headers["password"]);
            Console.WriteLine("User exists: {0}", userExists);

            if (userExists)
            {
                //  Get the username and id
                loggedParentInfo = ParentMethods.GetParentLoggedInfo(Request.Headers["email"], Request.Headers["password"]);
            }


            //  Return a json object containing the username, id and login confirmation
            return base.Content(JsonConvert.SerializeObject(new { UserInfo = loggedParentInfo, Authenticated = userExists }), "application/json", System.Text.Encoding.UTF8);
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
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return base.Content(JsonConvert.SerializeObject(new { confirmed = addedChild, name = ConvertToUnicode(Request.Headers["childName"]), age = int.Parse(Request.Headers["childAge"]), id = newlyAddedId }), "application/json", System.Text.Encoding.UTF8);
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.ActionName("GetChildrenForParent")]
        public ContentResult GetChildrenForParent()
        {
            Console.WriteLine("Sending children...");
            DataTable children = ChildMethods.GetChildrenForParent(int.Parse(Request.Headers["parentId"]));
            children.Columns["child_name"].ColumnName = "name";
            children.Columns["child_id"].ColumnName = "id";
            children.Columns["child_age"].ColumnName = "age";
            children.Columns["child_is_selected"].ColumnName = "isSelected";

            //  Return children as a json object
            return base.Content(JsonConvert.SerializeObject(children), "application/json", Encoding.UTF8);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.ActionName("GetDeleteChild")]
        public ContentResult GetDeleteChild()
        {
            int childId = int.Parse(Request.Headers["childId"]);
            int parentId = int.Parse(Request.Headers["parentId"]);

            try
            {
                ChildMethods.DeleteChild(int.Parse(Request.Headers["childId"]));

                //  If no child is selected, select the first one
                if (IsNoneSelected(parentId))
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
            return base.Content(JsonConvert.SerializeObject(new { childId = childId }), "application/json", System.Text.Encoding.UTF8);
        }

        /// <summary>
        /// Returns true if no child is selected (for the given parent), false otherwise
        /// </summary>
        /// <param name="parentId"></param>
        /// <returns></returns>
        private bool IsNoneSelected(int parentId)
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