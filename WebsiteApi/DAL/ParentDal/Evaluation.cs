using System;
using System.Collections.Generic;
using System.Text;

namespace ParentsApi.HelperClasses
{
    public class Evaluation
    {
        public string GameName { get; set; }
        public float AverageTimeInSeconds { get; set; }
        public float AverageMoveCount { get; set; }
        public string Difficulty { get; set; }
        public int LowestTime { get; set; }
        public int LowestMoveCount { get; set; }
        public float AverageScore { get; set; }

        public Evaluation(float averageScore, float averageTimeInSeconds, float averageMoveCount, string difficulty, int lowestTime, int lowestMoveCount, string gameName)
        {
            this.AverageTimeInSeconds = averageTimeInSeconds;
            this.AverageMoveCount = averageMoveCount;
            this.Difficulty = difficulty;
            this.LowestTime = lowestTime;
            this.LowestMoveCount = lowestMoveCount;
            this.AverageScore = averageScore;
            this.GameName = gameName;
        }
    }
}
