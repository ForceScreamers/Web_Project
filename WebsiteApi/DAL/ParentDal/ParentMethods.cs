﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 

using System.Data;
using System.Data.Odbc;
using DAL;
using ParentsApi.HelperClasses;

namespace ParentDal
{
    public class ParentMethods
    {
        public static int AddParent(string parentUsername, string parentEmail, string parentPassword, string parentRegistrationDate)
        {
            string com = "INSERT INTO parent (parent_username, parent_email, parent_password, parent_registration_date) VALUES (?, ?, ?, ?)";

            //  Pass as sql parameters for the parameterized query
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_username", parentUsername),
                new OdbcParameter("@parent_email", parentEmail),
                new OdbcParameter("@parent_password", parentPassword),
                new OdbcParameter("@parent_registration_date", parentRegistrationDate),
            };

            return UsersOdbcHelper.Execute(com, queryParameters);
        }

        /// <summary>
        /// Returns the username and id of a parent with the matching email and password
        /// </summary>
        /// <param name="parentEmail"></param>
        /// <param name="parentPassword"></param>
        /// <returns></returns>
        public static Parent GetParentLoggedInfo(string parentEmail, string parentPassword)
        {
            string com = "SELECT parent_id, parent_username FROM parent WHERE parent_email=? AND parent_password=?";
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_email", parentEmail),
                new OdbcParameter("@parent_password", parentPassword)
            };

            //  Execute command
            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

            //  Parse id
            int parentId = int.Parse(dt.Rows[0].ItemArray[0].ToString());
            string parentUsername = dt.Rows[0].ItemArray[1].ToString();


            Console.WriteLine("Parent id: " + parentId);
            Console.WriteLine("Parent username: " + parentUsername);

            return new Parent(parentUsername, parentId);
        }

        public static int DeleteParent(int parentId)
        {
            string com = "DELETE FROM parent WHERE parent_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_id", parentId)
            };
            return UsersOdbcHelper.Execute(com, queryParameters);
        }
        public static bool IsExists(string parentEmail)
        {
            string com = "SELECT parent_email FROM parent WHERE parent_email=?";
            bool exists = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_email", parentEmail),
            };

            //Add if check for existing users
            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

            if (dt.Rows.Count > 0)
            {
                exists = true;
            }

            return exists;
        }

        public static bool IsRegistered(string parentEmail, string parentPassword)
        {
            string com = "SELECT parent_email, parent_password FROM parent WHERE parent_email=? AND parent_password=?";
            bool registered = false;

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_email", parentEmail),
                new OdbcParameter("@parent_password", parentPassword),
            };

            //Add if check for existing users
            DataTable dt = UsersOdbcHelper.GetTable(com, queryParameters);

            if (dt.Rows.Count > 0)
            {
                registered = true;
            }

            return registered;
        }
    }
}