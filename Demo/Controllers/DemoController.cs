using Microsoft.AspNetCore.Mvc;

namespace Demo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DemoController : ControllerBase
    {
        private readonly ILogger<DemoController> _logger;

        public DemoController(ILogger<DemoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult ReOrderNumbers(string parameter)
        {
            var listNumber = parameter.Split(',').Select(int.Parse).ToList();
            if (listNumber.Any())
            {
                var firstNumbers = listNumber.OrderByDescending(x => x).Take(10).ToList();
                listNumber.RemoveAll(x => firstNumbers.Any(f => f == x));

                var secondNumbers = listNumber.OrderByDescending(x => x).Take(10).ToList();
                listNumber.RemoveAll(x => secondNumbers.Any(f => f == x));

                var thirdNumbers = listNumber.OrderByDescending(x => x).Take(10).ToList();
                listNumber.RemoveAll(x => thirdNumbers.Any(f => f == x));

                var result = new Dictionary<string, List<int>>
                {
                    { "firstNumbers", firstNumbers },
                    { "secondNumbers", secondNumbers },
                    { "thirdNumbers", thirdNumbers },
                    { "otherNumbers", listNumber }
                };

                return Ok(result);
            }

            return BadRequest();
        }
    }
}