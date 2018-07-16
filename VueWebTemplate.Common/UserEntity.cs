using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PetaPoco;

namespace VueWebTemplate.Common
{
    [TableName("yuangong")]
    [PrimaryKey("Badge")]
    public class UserEntity
    {
        /// <summary>
        /// 工号，六位字符串
        /// </summary>
        public string Badge { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        [Column("xingming")]
        public string Name { get; set; }
        /// <summary>
        /// 邮箱前缀
        /// </summary>
        public string CompanyMail { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        [Ignore]
        public string Email
        {
            get
            {
                if (string.IsNullOrEmpty(CompanyMail)) return string.Empty;
                return CompanyMail + ConfigurationManager.AppSettings["MailServer"];
            }
        }
        /// <summary>
        /// 主管工号
        /// </summary>
        public string Reporter { get; set; }
        /// <summary>
        /// 主管姓名
        /// </summary>
        public string ReporterName { get; set; }

        /// <summary>
        /// 获取用户
        /// </summary>
        /// <returns></returns>
        public static UserEntity GetSingle(string badge)
        {
            var db = new Database("QuanxianConn");
            return db.Single<UserEntity>("WHERE Badge = @0", badge);
        }        
    }
}
