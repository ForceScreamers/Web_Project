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
        public bool IsSelected { get; set; }
        public int Id { get; set; }
        public Child()
        {
            Name = "DEFAULT NAME";
            Age = -1;
            IsSelected = false;
            Id = -1;
        }
        public Child(string name, int age)
        {
            Name = name;
            Age = age;
            IsSelected = false;
            Id = -1;
        }
        public Child(string name, int age, bool isSelected, int id)
        {
            Name = name;
            Age = age;
            IsSelected = isSelected;
            Id = id;
        }
        public override string ToString()
        {
            return string.Format("Name: {0}, Age: {1}, Is selected: {2}, Id: {3}", Name, Age, IsSelected, Id);
        }
    }

    public class ParentInfo
    {
        public string Username { get; set; }
        public int Id { get; set; }
        public List<Child> Children { get; private set; }
        public void AddChildren(List<Child> childrenToAdd)
        {
            //  Concatenate the given list to this prop's list
            foreach(Child child in childrenToAdd) { Children.Add(child); }
        }


        public ParentInfo()
        {
            Username = "DEFAULT USERNAME";
            Id = -1;
            Children = new List<Child>();
        }

        public ParentInfo(string username, int id)
        {
            Username = username;
            Id = id;
            Children = new List<Child>();
        }
    }
}
