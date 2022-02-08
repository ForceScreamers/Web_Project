using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


using System.Data;

using System.Data.Odbc;


namespace DAL
{
    public class OdbcHelper
    {
        static OdbcConnection connection = new OdbcConnection(ConnectionString);

        public static string ConnectionString
        {
            get
            {
                return @"Dsn=ProviderDatabase";               
            }
        }

        //שאילתות עדכון מבנה ה –Database ושאילתות עדכון ,מחיקה והוספת רשומות.



        //  
        /*  -----------------   GENERAL NOTES For me :)   -----------------
         *  
         * - ODBC Parameters use '?' instead of the parameter names
         * 
         * - Need to connect with Odbc driver and then get the connection string to the database
         * 
         */

        public static int Execute(string com, OdbcParameter[] queryParameters)
        {
            

            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }

            // command יצירת אובייקט מסוג
            OdbcCommand command = new OdbcCommand(com, connection);

            for (int i = 0; i < queryParameters.Length; i++)
            {
                command.Parameters.Add(queryParameters[i]);
            }

            int result = 0;
            try
            {
                result = command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
            return result;

        }

        public static DataTable GetTable(string com, OdbcParameter[] queryParameters)
        {

            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            // command יצירת אובייקט מסוג 
            OdbcCommand command = new OdbcCommand(com, connection);

            for (int i = 0; i < queryParameters.Length; i++)
            {
                command.Parameters.Add(queryParameters[i]);
            }

            //יצירת אובייקט מסוג דטהסט - אוסף טבלאות בזיכרון המחשב
            DataTable dt = new DataTable();
            dt.TableName = "tbl";
            //יצירת אובייקט אדפטר מטרתו לתאם בין הדטהסט לדטהבייס
            OdbcDataAdapter adapter = new OdbcDataAdapter(command);

            try
            {
                //הפעולה פותחת את הדטהבייס ומחזירה את כל הנתונים לתוך טבלה חדשה בדטהסט

                adapter.Fill(dt);
            }
            catch (Exception e)
            {
                Console.Write(e.ToString());
                throw;
            }
            finally
            {
            }
            return dt;
        }
    }
}