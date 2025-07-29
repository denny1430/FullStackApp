using Microsoft.AspNetCore.Mvc;
using StudentManagement.Models;
using Microsoft.Data.SqlClient;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _config;

        public StudentController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Student> students = new();
            string query = "SELECT * FROM Students";

            using SqlConnection con = new(_config.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new(query, con);
            con.Open();
            using SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                students.Add(new Student
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    Age = (int)reader["Age"],
                    Course = reader["Course"].ToString()
                });
            }

            return Ok(students);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            string query = "SELECT * FROM Students WHERE Id = @Id";

            using SqlConnection con = new(_config.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@Id", id);
            con.Open();

            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                var s = new Student
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    Age = (int)reader["Age"],
                    Course = reader["Course"].ToString()
                };
                return Ok(s);
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult Post(Student s)
        {
            string query = "INSERT INTO Students (Name, Age, Course) VALUES (@Name, @Age, @Course)";

            using SqlConnection con = new(_config.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@Name", s.Name);
            cmd.Parameters.AddWithValue("@Age", s.Age);
            cmd.Parameters.AddWithValue("@Course", s.Course);
            con.Open();
            cmd.ExecuteNonQuery();

            return Ok("Inserted");
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Student s)
        {
            string query = "UPDATE Students SET Name=@Name, Age=@Age, Course=@Course WHERE Id=@Id";

            using SqlConnection con = new(_config.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@Name", s.Name);
            cmd.Parameters.AddWithValue("@Age", s.Age);
            cmd.Parameters.AddWithValue("@Course", s.Course);
            con.Open();
            int rows = cmd.ExecuteNonQuery();

            return rows > 0 ? Ok("Updated") : NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string query = "DELETE FROM Students WHERE Id=@Id";

            using SqlConnection con = new(_config.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@Id", id);
            con.Open();
            int rows = cmd.ExecuteNonQuery();

            return rows > 0 ? Ok("Deleted") : NotFound();
        }
    }
}
