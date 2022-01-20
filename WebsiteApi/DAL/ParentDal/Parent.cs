using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentsApi.HelperClasses
{
    public class Parent
    {
        public string Username { get; set; }
        public int Id { get; set; }
        public List<Child> Children { get; private set; }
        public void AddChildren(List<Child> childrenToAdd)
        {
            //  Concatenate the given list to this prop's list
            foreach(Child child in childrenToAdd) { Children.Add(child); }
        }

        public Parent()
        {
            Username = "DEFAULT USERNAME";
            Id = -1;
            Children = new List<Child>();
        }

        public Parent(string username, int id)
        {
            Username = username;
            Id = id;
            Children = new List<Child>();
        }
    }
}
