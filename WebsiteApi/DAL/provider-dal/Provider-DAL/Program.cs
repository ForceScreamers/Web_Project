using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Provider_DAL
{
    class Program
    {
        static void Main(string[] args)
        {
            //ProviderMethods.AddProvider("Kfir", "yee@mail", "1234", "10/9/2001", "Professinal Child", -1);
            TopicMethods.AddTopic("Test", -1);
            //PostMethods.AddPost(10, "Yada yada yada", 1, 0);
        }
    }
}
