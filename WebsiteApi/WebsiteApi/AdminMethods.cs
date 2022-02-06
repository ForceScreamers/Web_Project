using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.IO;
using Newtonsoft.Json;

namespace ParentsApi
{
    public class AdminMethods
    {
        public static bool IsAdmin(string email, string password)
        {
            Admin userToCheck = new Admin(email, password);
            List<Admin> admins = GetAdminUsers();



            return CheckIfAdmin(admins, userToCheck);
        }

        private static bool CheckIfAdmin(List<Admin> adminsList, Admin userToCheck)
        {
            bool isAdmin = false;
            foreach(Admin admin in adminsList)
            {
                if(admin.Email == userToCheck.Email && admin.Password == userToCheck.Password)
                {
                    isAdmin = true;
                }
            }
            return isAdmin;
        }

        private static List<Admin> GetAdminUsers()
        {
            using (StreamReader reader = new StreamReader("AdminFiles/AdminUsers.json"))
            {
                string json = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Admin>>(json);
            }
        }

        public class Admin
        {
            public string Email { get; set; }
            public string Password{ get; set; }
            public Admin(string email, string password)
            {
                this.Email = email;
                this.Password = password;
            }
        }
    }
}
