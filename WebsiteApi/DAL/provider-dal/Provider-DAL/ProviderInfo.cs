using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Provider_DAL
{
    public class ProviderInfo
    {
        //  full name, sex, email, password, occupation, workplace, phone number, experience
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public string Sex { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Occupation { get; set; }
        public string Workplace { get; set; }
        public string PhoneNumber { get; set; }
        public string Experience { get; set; }

        public List<Post> Posts { get; private set; }
        public void AddPosts(List<Post> postsToAdd)
        {
            //  Concatenate the given list to this prop's list
            foreach (Post post in postsToAdd) { Posts.Add(post); }
        }

        public ProviderInfo()
        {
            FirstName = "DEFAULT FIRST NAME";
            LastName = "DEFAULT LAST NAME";
            Id = -1;
            Posts = new List<Post>();
        }
    }

    public class Post
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public bool IsSelected { get; set; }
        public int Id { get; set; }
        public Post()
        {
            Name = "DEFAULT NAME";
            Age = -1;
            IsSelected = false;
            Id = -1;
        }
    }

}

