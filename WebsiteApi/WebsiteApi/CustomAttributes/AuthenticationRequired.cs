using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http.Results;
using WebApi.Jwt;

namespace ParentsApi.CustomAttributes
{
    public class AuthenticationRequired
    {
        private readonly RequestDelegate next;

        public AuthenticationRequired(RequestDelegate next)
        {
            Console.WriteLine("From custom attribute");
            this.next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {
            string token = httpContext.Request.Headers["x-access-token"].ToString();
            //bool isTokenValid = JwtManager.IsTokenValid(token);
            bool isTokenValid = true;

            //var controllerName = httpContext.GetRouteData();
            //IList<object> controllerActionDescriptor = httpContext
            //        .GetEndpoint()
            //        .Metadata
            //        .GetMetadata<ControllerActionDescriptor>()
            //        .EndpointMetadata;

            //var hasAuthAttribute = httpContext.MethodInfo.DeclaringType.GetCustomAttributes(true)
            //.Union(httpContext.MethodInfo.GetCustomAttributes(true))
            //.OfType<AuthorizeAttribute>()
            //.Any();

            //foreach (ControllerActionDescriptor item in controllerActionDescriptor)
            //{
            //    if (item.TypeId.Name)

            //}

            Console.WriteLine();

            if (isTokenValid)
            {
                return this.next(httpContext);
            }
            else
            {
                return SetErrorResponseInContext(httpContext);
            }
        }

        private Task SetErrorResponseInContext(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return context.Response.StartAsync();
        }
    }

    public static class AuthenticationRequiredMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthenticationRequired(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthenticationRequired>();
        }
    }
}
