using System.Web.Mvc;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TestResponsive() 
        {
            return View();
        }

        public ActionResult MapForm() 
        {
            return View();
        }
    }
}