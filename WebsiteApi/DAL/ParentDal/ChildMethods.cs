﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using System.Data.Odbc;
using DAL;

namespace ParentDal
{
    public class ChildMethods
    {
        //Add
        //Delete

        /// <summary>
        /// Returns all children's names and ages for teh matching parent id as a DataTable object
        /// </summary>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public static DataTable GetChildrenForParent(int parentId)
        {
            string com = "SELECT child_age, child_name, child_id, child_is_selected FROM child WHERE parent_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_id", parentId)
            };
            return UsersOdbcHelper.GetTable(com, queryParameters);
        }

        /// <summary>
        /// Returns the currently selected child
        /// </summary>
        /// <returns></returns>
        public static object GetCurrentChildName()
        {
            return UsersOdbcHelper.GetTable("SELECT child_name FROM child WHERE child_is_selected=-1", new OdbcParameter[0]);
        }

        /// <summary>
        /// Selects the child with the matching id in the database, returns true or false whether the child was successfully selected
        /// </summary>
        /// <param name="childId"></param>
        /// <returns></returns>
        public static bool SelectChild(int childId, int parentId)
        {
            int result = -1;
            OdbcParameter[] queryParameters = {
                new OdbcParameter("@child_id", childId),
            };

            //  Switch selection to the child with the given id
            try
            {
                //  De-select the children of that parent 
                //;
                string updateChildQuery = "UPDATE parent INNER JOIN child ON parent.parent_id = child.parent_id SET child.child_is_selected = 0 WHERE(((parent.parent_id) =?));";
                result = UsersOdbcHelper.Execute(updateChildQuery, new[] { new OdbcParameter("@parent_id", parentId) });

                //  Select the child with the given id
                result = UsersOdbcHelper.Execute("UPDATE child SET child_is_selected=-1 WHERE child_id=?", queryParameters);
            }
            catch (Exception e) { Console.WriteLine(e); }

            //  Get the id of the selected child
            //DataTable dt = OdbcHelper.GetTable("SELECT child_id FROM child WHERE child_is_selected=-1", new OdbcParameter[0]);
            //int id = (int)dt.Rows[0].ItemArray[0];

            Console.WriteLine(result);
            return result == 1 ? true : false;
        }

        /// <summary>
        /// Adds a child into the database and returns it's id
        /// </summary>
        /// <param name="parentId"></param>
        /// <param name="childAge"></param>
        /// <param name="childName"></param>
        /// <returns></returns>
        public static int AddChild(int parentId, int childAge, string childName)
        {
            string com = "INSERT INTO child (parent_id, child_age, child_name) VALUES (?, ?, ?)";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@parent_id", parentId),
                new OdbcParameter("@child_age", childAge),
                new OdbcParameter("@child_name", childName),
            };

            return ExecuteAndGetChildId(com, queryParameters);
        }


        public static int DeleteChild(int childId)
        {
            string com = "DELETE FROM child WHERE child_id=?";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@child_id", childId),
            };

            return ExecuteAndGetChildId(com, queryParameters);
        }

        /// <summary>
        /// Executes the query and returns the latest operated child id
        /// </summary>
        /// <param name="com"></param>
        /// <param name="queryParameters"></param>
        /// <returns></returns>
        private static int ExecuteAndGetChildId(string com, OdbcParameter[] queryParameters)
        {
            int result;
            try
            {
                //  Try insert command
                UsersOdbcHelper.Execute(com, queryParameters);
            }
            catch (Exception e) { Console.WriteLine(e); }
            finally
            {
                result = GetIdFromDataTable(UsersOdbcHelper.GetTable("SELECT @@IDENTITY FROM child", new OdbcParameter[0]));
            }
            return result;
        }

        private static int GetIdFromDataTable(DataTable dt)
        {
            //  Get child_id from datatable
            return int.Parse(dt.Rows[0].ItemArray[0].ToString());
        }

        public static void UpdateChildInfo(int childId, string childName, int childAge)
        {
            string com = @"UPDATE child SET child.child_age = ?, child.child_name = ?
                           WHERE(((child.child_id) = ?));";

            OdbcParameter[] queryParameters = {
                new OdbcParameter("@child_age", childAge),
                new OdbcParameter("@child_name", childName),
                new OdbcParameter("@child_id", childId),
            };

            UsersOdbcHelper.Execute(com, queryParameters);
        }

    }
}
