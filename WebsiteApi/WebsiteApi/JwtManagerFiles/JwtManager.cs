using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
//using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace ParentsApi
{
    public class JwtManager
    {
        
        private ActiveUsers ActiveUsers;

        //  Change to .env variable
        private const string Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";

        private const int TOKEN_EXPIRE_MINUTES = 20;
        private const int HOURS_TO_MINUTES = 1440;

        public JwtManager()
        {
            ActiveUsers = new ActiveUsers();
        }

        public string GenerateToken(string email)
        {
            string token = CreateNewToken(email);
            
            // Check if the email is currenlty logged in
            if (ActiveUsers.IsEmailActive(email))
            {
                //  Overwrite other instance of email and token
                ActiveUsers.OverwriteActiveUser(email, token);
            }
            else
            {
                
                ActiveUsers.AddActiveUser(new ActiveUser(token, email));
            }
            List<ActiveUser> a = ActiveUsers.GetActiveUsers();

            return token;
        }

        private string CreateNewToken(string email)
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

        private ClaimsPrincipal GetPrincipal(string token)
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

        public bool IsTokenValid(string token)
        {
            Console.WriteLine(token);
           
            //  A token is valid only if it's active and matches the principals pattern
            return ActiveUsers.IsUserActive(token) && IsTokenAuthenticated(token);
        }

        private bool IsTokenAuthenticated(string token)
        {
            bool isAuth = true;

            var simplePrinciple = GetPrincipal(token);
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null || !identity.IsAuthenticated)
                isAuth = false;
            return isAuth;
        }

        public void DisconnectActiveUser(string email)
        {
            ActiveUsers.RemoveActiveUser(email);
        }
    }
}
