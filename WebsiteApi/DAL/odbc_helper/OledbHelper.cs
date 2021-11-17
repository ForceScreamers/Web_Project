using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Windows.Forms;
using System.Data;
using System.Data.OleDb;


namespace DAL
{
    public class oledbhelper
    {
        static OleDbConnection connection = new OleDbConnection(ConnectionString);

        public static string ConnectionString
        {
            get
            {
                return @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + Application.StartupPath + "/Parents_Db.accdb";
                //return @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\Kfir\Desktop\Databases\Parents_Db.accdb";
               
            }
        }

        //שאילתות עדכון מבנה ה –Database ושאילתות עדכון ,מחיקה והוספת רשומות.

        public static int Execute(string com, object[] queryParameters)
        {
            int result = 0;

            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }

            // command יצירת אובייקט מסוג
            OleDbCommand command = new OleDbCommand(com, connection);

            for (int i = 0; i < queryParameters.Length; i++)
            {
                command.Parameters.Add(queryParameters[i]);
            }

            //command.Connection = connection;
            //command.CommandText = com;

            try
            {
                result = command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                //Console.WriteLine(e);
                throw;
            }
            return result;

        }

        public static DataTable GetTable(string com, OleDbParameter[] queryParameters)
        {

            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            // command יצירת אובייקט מסוג 
            OleDbCommand command = new OleDbCommand(com, connection);

            for (int i = 0; i < queryParameters.Length; i++)
            {
                command.Parameters.Add(queryParameters[i]);
            }

            //יצירת אובייקט מסוג דטהסט - אוסף טבלאות בזיכרון המחשב
            DataTable dt = new DataTable();
            dt.TableName = "tbl";
            //יצירת אובייקט אדפטר מטרתו לתאם בין הדטהסט לדטהבייס
            OleDbDataAdapter adapter = new OleDbDataAdapter(command);

            try
            {
                //הפעולה פותחת את הדטהבייס ומחזירה את כל הנתונים לתוך טבלה חדשה בדטהסט

                adapter.Fill(dt);
            }
            catch
            {
                throw;
            }
            finally
            {
            }
            return dt;
        }
    }
}