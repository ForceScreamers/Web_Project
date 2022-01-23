using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentsApi
{
    public class ActiveUser
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public ActiveUser(string token, string email)
        {
            this.Token = token;
            this.Email = email;
        }
    }
    public class ActiveUsers
    {
        private List<ActiveUser> activeUsers;

        public ActiveUsers()
        {
            activeUsers = new List<ActiveUser>();
        }

        public List<ActiveUser> GetActiveUsers() { return activeUsers; }

        public void AddActiveUser(ActiveUser activeUser)
        {
            activeUsers.Add(activeUser);
        }

        public void RemoveActiveUser(string email)
        {
            //var item = myList.Find(x => x.ItemName == obj.ItemName);
            //myList.Remove(item);

            ActiveUser activeUserToRemove = activeUsers.Find(activeUser => activeUser.Email == email);
            activeUsers.Remove(activeUserToRemove);
        }

        public bool IsUserActive(string token)
        {
            bool isTokenActive = false;
            foreach (ActiveUser activeToken in activeUsers)
            {
                if (activeToken.Token == token)
                {
                    isTokenActive = true;
                }
            }
            return isTokenActive;
        }
        public bool IsEmailActive(string email)
        {
            bool isEmailActive = false;
            foreach (ActiveUser activeToken in activeUsers)
            {
                if (activeToken.Email == email)
                {
                    isEmailActive = true;
                }
            }
            return isEmailActive;
        }
        private ActiveUser GetActiveUserByEmail(string email)
        {
            ActiveUser activeUserFound = new ActiveUser("NO TOKEN", "NO EMAIL");
            foreach (ActiveUser activeToken in activeUsers)
            {
                if (activeToken.Email == email)
                {
                    activeUserFound = activeToken;
                }
            }
            return activeUserFound;
        }
        public void OverwriteActiveUser(string email, string newToken)
        {
            //  Replace the old token instance with a new one, for the matching email address

            ActiveUser oldUser = GetActiveUserByEmail(email);
            oldUser.Token = newToken;
        }
    }
}
