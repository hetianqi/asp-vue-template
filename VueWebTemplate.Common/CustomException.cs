using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VueWebTemplate.Common
{
    public class CustomException : System.Exception
    {
        public CustomException() : base() { }

        public CustomException(string message) : base(message)
        {
            
        }

        public CustomException(string message, params object[] args) : this(string.Format(message, args))
        {

        }
    }
}
