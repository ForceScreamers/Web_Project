using System;
using System.Collections.Generic;
using System.Text;

namespace ParentsApi.HelperClasses
{
    public class Evaluation
    {
        public string GameName { get; set; }
        public int Score { get; set; }

        public Evaluation(int score, string gameName)
        {
            this.Score = score;
            this.GameName = gameName;
        }
    }
}
