import connect from "./libs/database.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcrypt";

try {
  console.log("Attempting to seed db...");

  const password = await bcrypt.hash("abcd1234A!", 10);
  console.log(password);

  // Connect to "todo-app" db
  await connect();

  // Use the User model to delete any documents already in the "users" collection
  await Admin.deleteMany({});

  const admin = {
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/320px-User-avatar.svg.png",
    firstname: "Worlanyo",
    lastname: "Kporfeame",
    password: password,
    email: "kworlanyo@gmail.com",
    companyName: "Tech Solutions",
    companyId: "04c481d9-1274-4abd-bcf2-ec058f682102",
    role: "Admin",
    departments: [
      "6668ceafbc3e02b7574c4bdb",
      "666b23df4bb9ad8e0ad0db54",
      "6670005598470505dfa4c8bf",
      "6671f8534b7bf965a0d27fdc",
      "6671f8754b7bf965a0d27fef",
      "6671f8c14b7bf965a0d28002",
    ],
    employees: [
      "6668cf22bc3e02b7574c4be2",
      "666b24984bb9ad8e0ad0db5c",
      "666f2a8a632ebde0404ab61b",
      "66720493c7f405b00b7e4fbd",
      "66720b56be6e81610d17927f",
      "66720c1bbe6e81610d179289",
      "66720cebbe6e81610d179293",
      "66720daebe6e81610d1792a0",
      "66720e70be6e81610d1792aa",
      "66720fb0be6e81610d1792ba",
      "66721060be6e81610d1792c4",
      "66721127be6e81610d1792ce",
      "667211f8be6e81610d1792d8",
      "667212d1be6e81610d1792e2",
      "66721381be6e81610d1792ec",
      "66721465be6e81610d1792fc",
      "667215b4be6e81610d17930c",
      "66721679be6e81610d179316",
    ],
  };

  // Use the User model to insert the mock data into the "users" collection
  await Admin.create(admin);

  console.log("DB seeded!");

  // Exit process with "success" code
  process.exit(0);
} catch (error) {
  console.log(error);

  // Exit process with "failure" code
  process.exit(1);
}
