using System;
using System.Collections.Generic;
using System.Text;

namespace ParentsApi.HelperClasses
{

    public class Child
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public bool IsSelected { get; set; }
        public int Id { get; set; }
        public List<Evaluation> Evaluations { get; set; }
        public Child()
        {
            Name = "DEFAULT NAME";
            Age = -1;
            IsSelected = false;
            Id = -1;
            Evaluations = new List<Evaluation>();
        }
        public Child(string name, int age)
        {
            Name = name;
            Age = age;
            IsSelected = false;
            Id = -1;
            Evaluations = new List<Evaluation>();
        }
        public Child(string name, int age, bool isSelected, int id)
        {
            Name = name;
            Age = age;
            IsSelected = isSelected;
            Id = id;
            Evaluations = new List<Evaluation>();
        }

        public void AddEvaluations(List<Evaluation> evaluationsToAdd)
        {
            foreach (Evaluation evaluation in evaluationsToAdd) { Evaluations.Add(evaluation); }
        }
        public override string ToString()
        {
            return string.Format("Name: {0}, Age: {1}, Is selected: {2}, Id: {3}", Name, Age, IsSelected, Id);
        }
    }
}
