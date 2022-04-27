using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProviderDal
{
    public class ProviderInfo
    {
        //  full name, email, password, occupation, workplace, phone number, experience
        public string FullName { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Occupation { get; set; }
        public string Workplace { get; set; }
        public string PhoneNumber { get; set; }
        public string Experience { get; set; }

        public List<Article> Posts { get; private set; }
        public void AddPosts(List<Article> postsToAdd)
        {
            //  Concatenate the given list to this prop's list
            foreach (Article post in postsToAdd) { Posts.Add(post); }
        }

        public ProviderInfo()
        {
            FullName = "DEFAULT FULL NAME";
            Id = -1;
            Posts = new List<Article>();
        }

        public ProviderInfo(string fullName, int id, string occupation, string email)
        {
            this.FullName = fullName;
            this.Id = id;
            this.Occupation = occupation;
            this.Email = email;
        }
    }

    public class Article
    {
        public int Id { get; set; }
        public string TopicName { get; set; }
        public string Content { get; set; }


        public Article()
        {
            Id = -1;
            TopicName = "DEFAULT NAME";
            Content = "DEFAULT CONTENT";
        }
    }

}

