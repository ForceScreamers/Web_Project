using ProviderDal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentsApi.HelperFunctions
{
    public class AdminHelperFunctions
    {
        public static void ConfirmProvider(int providerId)
        {
            ProviderMethods.ConfirmProvider(providerId);
        }
    }
}
