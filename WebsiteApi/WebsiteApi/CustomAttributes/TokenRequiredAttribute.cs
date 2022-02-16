using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using WebApi.Jwt;

namespace ParentsApi.Controllers
{
    public class TokenRequiredAttribute : AuthorizationFilterAttribute
    {
        public bool IsTokenRequired { get; set; }
        public TokenRequiredAttribute()
        {
            IsTokenRequired = true;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            object token = actionContext.Request.Headers;
            //bool isTokenValid = JwtManager.IsTokenValid(token);

            if (true) // or whatever check you make
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return;
            }
        }

    }
}