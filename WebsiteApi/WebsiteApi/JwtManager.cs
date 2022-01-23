using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
//using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace ParentsApi
{
    


    public static class JwtManager
    {
        //  Token, Email
        private class ActiveUser
        {
            public string Token { get; set; }
            public string Email { get; set; }
            public ActiveUser(string token, string email)
            {
                this.Token = token;
                this.Email = email;
            }
        }
        private class ActiveUsersManager
        {
            private List<ActiveUser> activeUsers;

            public ActiveUsersManager()
            {
                activeUsers = new List<ActiveUser>();
            }

            public List<ActiveUser> GetActiveUsers() { return activeUsers; }

            public void AddActiveUser(ActiveUser activeUser)
            {
                activeUsers.Add(activeUser);
            }
            public void RemoveActiveUser(ActiveUser activeUser)
            {
                activeUsers.Remove(activeUser);
            }
            public bool IsUserActive(string token)
            {
                bool isTokenActive = false;
                foreach(ActiveUser activeToken in activeUsers)
                {
                    if(activeToken.Token == token)
                    {
                        isTokenActive = true;
                    }
                }
                return isTokenActive;
            }
            public bool IsEmailActive(string email)
            {
                bool isEmailActive = false;
                foreach (ActiveUser activeToken in activeUsers)
                {
                    if (activeToken.Email == email)
                    {
                        isEmailActive = true;
                    }
                }
                return isEmailActive;
            }
            private ActiveUser GetActiveUserByEmail(string email)
            {
                ActiveUser activeUserFound = new ActiveUser("NO TOKEN", "NO EMAIL");
                foreach(ActiveUser activeToken in activeUsers)
                {
                    if(activeToken.Email == email)
                    {
                        activeUserFound = activeToken;
                    }
                }
                return activeUserFound;
            }
            public void OverwriteActiveUser(string email, string newToken)
            {
                //  Replace the old token instance with a new one, for the matching email address

                ActiveUser oldUser = GetActiveUserByEmail(email);
                oldUser.Token = newToken;
            }
        }


        //  Change to .env variable
        private const string Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";

        private const int TOKEN_EXPIRE_MINUTES = 20;
        private const int HOURS_TO_MINUTES = 1440;

        public static string GenerateToken(string email)
        {
            string token = CreateNewToken(email);

            // Check if the email is currenlty logged in
            if (ActiveUsersManager.IsEmailActive(email))
            {
                //  Overwrite other instance of email and token
                ActiveUsersManager.OverwriteActiveUser(email, token);
            }
            else
            {
                ActiveUsersManager.AddActiveUser(new ActiveUser(token, email));
            }
            List<ActiveUser> a = ActiveUsersManager.GetActiveUsers();

            return token;
        }

        private static string CreateNewToken(string email)
        {
            var symmetricKey = Convert.FromBase64String(Secret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                        {
                            new Claim(ClaimTypes.Name, email)
                        }),

                Expires = now.AddMinutes(Convert.ToInt32(TOKEN_EXPIRE_MINUTES * HOURS_TO_MINUTES)),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256)
            };

            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(securityToken);
        }

        private static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(Secret);

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                return principal;
            }

            catch (Exception)
            {
                return null;
            }
        }

        public static bool IsTokenValid(string token)
        {
            Console.WriteLine(token);
           
            //  A token is valid only if it's active and matches the principals pattern
            return ActiveUsersManager.IsUserActive(token) && IsTokenAuthenticated(token);
        }

        private static bool IsTokenAuthenticated(string token)
        {
            bool isAuth = true;

            var simplePrinciple = GetPrincipal(token);
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null || !identity.IsAuthenticated)
                isAuth = false;
            return isAuth;
        }

    }
}
