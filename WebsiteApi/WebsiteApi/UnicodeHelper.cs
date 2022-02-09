using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParentsApi
{
    public class UnicodeHelper
    {
        public static string ConvertToUnicode(string utf8text)
        {
            return Encoding.Unicode.GetString(Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); 
        }

    }
}
