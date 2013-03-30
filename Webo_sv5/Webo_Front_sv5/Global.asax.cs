using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Data.Entity;
using Webo_Front_sv5.Models;
using System.Web.Security;
using WebMatrix.WebData;

namespace Webo_Front_sv5
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            //System.Data.Entity.Database.SetInitializer(new Webo_Front_sv5.Models.ContextInitializer());

            Database.SetInitializer<Webo_Front_sv5Context>(new ContextInitializer());
            Webo_Front_sv5Context context = new Webo_Front_sv5Context();
            context.Database.Initialize(true);
            if (!WebSecurity.Initialized)
                WebSecurity.InitializeDatabaseConnection("DefaultConnection",
                     "UserProfile", "UserId", "UserName", autoCreateTables: true);
        }
    }
}