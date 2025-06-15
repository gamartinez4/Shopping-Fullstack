using HotChocolate.Execution;
using System;

namespace WebApplication1.Utils
{
    public class TokenValidator
    {
        public static string Token { get; set; }

        static void ValiateToken(string possibleToken)
        {
            if (possibleToken != Token)
            {
                throw new Exception("Parameter index is out of range.");
            }
        }
    }
}
