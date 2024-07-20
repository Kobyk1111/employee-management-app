import connect from "./libs/database.js";
// import Admin from "./models/Admin.js";
import Department from "./models/Department.js";
// import bcrypt from "bcrypt";

try {
  console.log("Attempting to seed db...");

  // Connect to "todo-app" db
  await connect();

  // Use the Department model to delete any documents already in the "users" collection
  await Department.deleteMany({});

  const departments = [
    {
      name: "Design",
      companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
      employees: [],
    },
    {
      name: "Finance",
      companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
      employees: [],
    },
    {
      name: "Management",
      companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
      employees: [],
    },
    {
      name: "Engineering",
      companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
      employees: [],
    },
    {
      name: "Marketing",
      companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
      employees: [],
    },
    {
      name: "Human Resource",
      companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
      employees: [],
    },
  ];

  // Use the Department model to insert the mock data into the "users" collection
  await Department.create(departments);

  console.log("DB seeded!");

  // Exit process with "success" code
  process.exit(0);
} catch (error) {
  console.log(error);

  // Exit process with "failure" code
  process.exit(1);
}
