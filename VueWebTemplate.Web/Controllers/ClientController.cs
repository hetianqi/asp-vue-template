﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VueWebTemplate.Web.Controllers
{
    /// <summary>
    /// 客户端控制器
    /// 单页面
    /// 将所有页面路由交给前端控制
    /// </summary>
    [AllowAnonymous]
    public class ClientController : Controller
    {
        /// <summary>
        /// 页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("~/Views/index.cshtml");
        }

        /// <summary>
        /// 错误返回
        /// </summary>
        /// <returns></returns>
        public ActionResult Error(string errorCode, string errorMsg)
        {
            return Json(new { State = false, Code = errorCode, Msg = errorMsg }, JsonRequestBehavior.AllowGet);
        }
    }
}