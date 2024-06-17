import mongoose from "mongoose";
import Chance from "chance";
import Admin from "./models/Admin.js";
import Department from "./models/Department.js";
import Employee from "./models/Employee.js";
import connect from "./libs/database.js";
import bcrypt from "bcrypt";

const chance = new Chance();

const hashedPassword = await bcrypt.hash("abcd1234A!", 10);

// Connect to MongoDB
await connect();

// Generate departments
const generateDepartment = () => {
  return new Department({
    name: chance.company(),
  });
};

// Generate employees
const generateEmployee = (departmentId) => {
  return new Employee({
    firstname: chance.first(),
    lastname: chance.last(),
    email: chance.email(),
    gender: chance.gender(),
    maritalStatus: chance.pickone(["Single", "Married", "Divorced", "Widowed"]),
    employeeID: chance.guid(),
    jobTitle: chance.profession(),
    employmentType: chance.pickone(["Full-time", "Part-time", "Contract", "Internship"]),
    employmentStatus: chance.pickone(["Active", "Inactive", "Terminated"]),
    noOfChildren: chance.integer({ min: 0, max: 5 }),
    phoneNumber: chance.phone(),
    dateOfBirth: chance.birthday({ string: true }),
    dateOfJoining: chance.date({ string: true }),
    city: chance.city(),
    state: chance.state(),
    country: chance.country(),
    street: chance.street(),
    houseNumber: chance.integer({ min: 1, max: 100 }),
    postalCode: chance.zip(),
    department: departmentId,
    salary: chance.dollar({ max: 100000 }),
    bankAccountDetails: {
      bankName: chance.company(),
      IBAN: chance.bb_pin(),
      BIC: chance.bb_pin(),
    },
    taxIdentificationNumber: chance.integer({ min: 100000000, max: 999999999 }),
    socialSecurityNumber: chance.ssn(),
    incomeTaxClass: chance.integer({ min: 1, max: 6 }),
    healthInsuranceCompany: chance.company(),
  });
};

// Generate admin
const generateAdmin = async () => {
  try {
    await Admin.deleteMany({});
    await Employee.deleteMany({});
    await Department.deleteMany({});

    // Generate departments
    const departments = [];
    for (let i = 0; i < 5; i++) {
      const department = generateDepartment();
      await department.save();
      departments.push(department);
    }

    // Generate employees
    const employees = [];
    for (let i = 0; i < 10; i++) {
      const employee = generateEmployee(departments[chance.integer({ min: 0, max: 4 })]._id);
      await employee.save();
      employees.push(employee);
    }

    // Create an admin
    const admin = new Admin({
      firstname: chance.first(),
      lastname: chance.last(),
      password: hashedPassword,
      email: chance.email(),
      departments: departments.map((department) => department._id),
      employees: employees.map((employee) => employee._id),
    });

    await admin.save();

    // await admin.populate({ path: "departments", select: "name" });

    await admin.populate({
      path: "departments",
      select: "name",
    });
    // .exec();

    console.log(admin.departments);

    console.log("Admin created successfully with 5 departments and 10 employees!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

generateAdmin();
