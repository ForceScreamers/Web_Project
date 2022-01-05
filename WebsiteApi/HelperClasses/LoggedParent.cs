using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsiteApi.HelperClasses
{
    public class Child
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public boot IsSelected { get; set; }
    }

    public class LoggedParent
    {
        public string ParentUsername { get; set; }
        public int ParentId { get; set; }
        public List<Child> Children { get; }

        public LoggedParent()
        {
            ParentUsername = "DEFAULT USERNAME";
            ParentId = -1;
            Children = new List<Child>();
        }

        public LoggedParent(string username, int id)
        {
            ParentUsername = username;
            ParentId = id;
            Children = new List<Child>();
        }
    }
}
