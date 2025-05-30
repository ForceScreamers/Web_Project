﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ProviderDal; 
using Newtonsoft.Json;
using System.Data;
using System.Text;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using ParentsApi;

namespace ProvidersApi
{
	public class ProviderHelperFunctions
	{
		public static void DeleteArticle(int articleId)
		{
			try
			{
				//	Delete post from database
				ProviderMethods.DeleteArticle(articleId);
			}
			catch (Exception e) { 
				Console.WriteLine(e); 
			}
		}

		public static string GetArticlesBy(string tableName, string filterValue)
		{
			if(tableName != "all" || filterValue != "all")
			{
				return JsonConvert.SerializeObject(ProviderMethods.GetAllArticlesBy(tableName, filterValue));
			}
			else
			{
				return JsonConvert.SerializeObject(ProviderMethods.GetAllArticles());
			}
		}

		public static string GetArticles(int providerId)
		{

			//List<Post> children = GetChildrenForParent(providerId);

			////  If no child is selected, select the first one
			//if (children.Count > 0 && IsNoChildSelectedForParent(providerId))
			//{
			//	ChildMethods.SelectChild(GetFirstChildId(providerId), providerId);
			//	Console.WriteLine("Switching child...");
			//}

			////  Return children as a json object
			//return JsonConvert.SerializeObject(children);
			return null;
		}
		public static string PostArticle(int providerId, int topicId, string content, string title)
		{
			//TODO: Add posted successfully
			ProviderMethods.PostArticle(providerId, topicId, content, title);

			//bool childAddConfirm = false;
			//try
			//{
			//	//  Add child to database
			//	child.Id = ChildMethods.AddChild(parentId, child.Age, ConvertToUnicode(child.Name));
			//	PostMethods.AddPost(providerId, )
			//	Console.Write("Added child, id: {0}", child.Id);

			//	childAddConfirm = true;
			//}
			//catch (Exception e)
			//{
			//	Console.WriteLine(e);
			//}

			////	TODO: Check if you really need to return info
			//return JsonConvert.SerializeObject(new { confirmed = childAddConfirm, name = ConvertToUnicode(child.Name), age = child.Age, id = child.Id });
			return null;
		}


		public static string GetArticleById(int articleId)
		{
			return JsonConvert.SerializeObject(ProviderMethods.GetArticleById(articleId));
		}


		public static string CreateTopic(string topicName)
		{
			bool isTopicExists = ProviderMethods.IsTopicExists(topicName);

			if (isTopicExists == false)
			{
				ProviderMethods.CreateTopic(topicName);
			}

			return JsonConvert.SerializeObject(new { IsTopicExists = isTopicExists });
		}

		public static string GetAllTopics()
		{
			return JsonConvert.SerializeObject(new { Topics = ProviderMethods.GetAllTopics() });
		}

		public static string ProviderLogin(string email, string password)
		{
			bool canProviderLogIn = false;
			ProviderInfo providerInfo = new ProviderInfo();

			bool isAdmin = AdminMethods.IsAdmin(email, password);

			try
			{
				if (isAdmin)
				{
					return JsonConvert.SerializeObject(new { AllowedToLogin = canProviderLogIn, IsAdmin = isAdmin });
				}

				if (ProviderMethods.IsRegistered(email, password))
				{
					canProviderLogIn = ProviderMethods.IsPermitted(email);
					providerInfo = ProviderMethods.GetProviderInfo(email, password);
				}
			}
			catch(Exception e)
			{
				Console.WriteLine(e);
			}
			finally	//For debugging
			{
				Console.WriteLine("User exists: {0}", canProviderLogIn);
			}


			
			
			return JsonConvert.SerializeObject(new { AllowedToLogin = canProviderLogIn, Info = providerInfo,  });
		}

		public static string ProviderRegister(string fullName, string email, string password, string occupation)
		{
            Console.WriteLine("Registering provider: {0} {1} {2} {3}", fullName, email, password, occupation);
			Console.WriteLine("Provider full name converted: {0}", UnicodeHelper.ConvertToUnicode(fullName));

            bool providerRegistered = false;
            bool providerExists = ProviderMethods.IsExists(email);

            if (providerExists == false)
            {
                int result = 0;

                try
                {
                    //  Add provider to db
                    result = ProviderMethods.AddProvider(
						UnicodeHelper.ConvertToUnicode(fullName), 
						email, 
						password, 
						DateTime.Today.ToString(),
						UnicodeHelper.ConvertToUnicode(occupation));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }

                //  If there are no errors, the provider is registered
                providerRegistered = (result == 1);
            }

            return JsonConvert.SerializeObject(
                new
                {
                    Registered = providerRegistered,
                    UserExists = providerExists,
                    //	Posts perhaps?
                });
		}


		public static string GetArticlesForProvider(int providerId)
		{
			return JsonConvert.SerializeObject(new { Articles = ProviderMethods.GetAllArticlesByProviderId(providerId) });
		}

		public static List<ProviderInfo> GetProviderInfos()
        {
			DataTable providersDt = ProviderMethods.GetProviders();

			//  Convert datatable to list object
			List<ProviderInfo> providerInfos = ProvidersDataTableToObject(providersDt);

			return providerInfos;
		}

		private static List<ProviderInfo> ProvidersDataTableToObject(DataTable providersDt)
		{
            List<ProviderInfo> providerInfosList = new List<ProviderInfo>();

            foreach (DataRow row in providersDt.Rows)
            {                
				int providerId = int.Parse(row.ItemArray[0].ToString());
				string providerFullName = row.ItemArray[1].ToString();
				string providerOccupation = row.ItemArray[2].ToString();
				string providerEmail = row.ItemArray[3].ToString();
				string providerPhoneNumber = row.ItemArray[4].ToString();

				providerInfosList.Add(new ProviderInfo(providerFullName, providerId, providerOccupation, providerEmail, providerPhoneNumber));
			}

            return providerInfosList;
		}
		private static string ConvertToUnicode(string utf8text)
		{ return Encoding.Unicode.GetString(UTF8Encoding.Convert(Encoding.UTF8, Encoding.Unicode, Encoding.UTF8.GetBytes(utf8text))); }

		public static void ConfirmProvider(int providerId)
		{
			ProviderMethods.ConfirmProvider(providerId);
		}

		/// <summary>
		/// Returns true if no child is selected (for the given parent), false otherwise
		/// </summary>
		private static bool IsNoChildSelectedForParent(int parentId)
		{
			//DataTable children = PostMethods.GetChildrenForParent(parentId);
			//bool isSelected = false;

			//Console.WriteLine("All children ids");

			////  Iterate through children
			//foreach (DataRow row in children.Rows)
			//{
			//	Console.WriteLine((int)row["child_id"]);
			//	if ((bool)row["child_is_selected"])//If the child is selected
			//	{
			//		isSelected = true;
			//	}
			//}

			//return !isSelected;
			return false;
		}

		private static List<Article> GetPostsForProvider(int providerId)
		{
			DataTable childrenDt = PostMethods.GetPostsForProvider(providerId);
			//List<Post> childrenList = ChildrenDataTableToObject(childrenDt);

			//	TODO: CHECK IF NEEDED \/ \/
			//childrenDt.Columns["child_name"].ColumnName = "name";
			//childrenDt.Columns["child_id"].ColumnName = "id";
			//childrenDt.Columns["child_age"].ColumnName = "age";
			//childrenDt.Columns["child_is_selected"].ColumnName = "isSelected";

			return null;
		}

		public static void UpdateProviderInfo(int providerId, string providerName, string providerEmail, string providerOccupation, string providerPhoneNumber)
		{
			ProviderMethods.UpdateProviderInfo(providerId, providerName, providerEmail, providerOccupation, providerPhoneNumber);
		}
		public static void UpdateArticle(int articleId, string articleTitle, string articleContent, string articleTopic)
		{
			ProviderMethods.UpdateArticle(articleId, articleTitle, articleContent, articleTopic);
		}
	}
}
