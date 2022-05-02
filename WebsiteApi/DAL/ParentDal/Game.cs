using System;
using System.Collections.Generic;
using System.Text;

namespace ParentDal
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Topics { get; set; }
        public Game()
        {
            this.Id = -1;
            this.Name = "DEFAULT NAME";
            this.Description = "DEFAULT DESCRIPTION";
            this.Topics = new List<string>();
        }
        public Game(int id, string name, string description, List<string> topics)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Topics = topics;
        }
    }
}
