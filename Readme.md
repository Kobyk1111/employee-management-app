# AdminHub Employee Management Application

## Table of Contents

- [AdminHub Employee Management Application](#adminhub-employee-management-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Frontend Setup](#frontend-setup)
    - [Backend Setup](#backend-setup)
  - [Usage](#usage)
  - [Demo](#demo)
  - [Responsiveness](#responsiveness)
  - [Known Issues](#known-issues)
  - [Contact](#contact)

## Overview

The AdminHub Employee Management Application is a full-stack application designed to streamline HR operations within a company in Germany. It provides features for managing employee records, assigning employees to departments, and ensuring data consistency across the application. The project was developed using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features

- User authentication and role-based access control
- Management of employee records
- Assign employees to departments
- Update department information and propagate changes to related employees
- Prevent deletion of departments with assigned employees

## Tech Stack

- **Frontend:** React, React Router Dom, useContext, useReducer
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Styling:** CSS

## Installation

### Frontend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/kworlanyo/Employee-Management-App.git
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

### Backend Setup

1. **Install dependencies (use `--force` due to package issues):**

   ```sh
   npm install --force
   ```

2. **Start the backend server:**

   ```sh
   npm run devStart
   ```

## Usage

1. Click the "Get Started" button on the landing page to register or log in as an admin, or to log in as an employee. Note that employees must have their records created by an admin and will use the default password "abcd1234A!" along with their email to log in. After the initial login, employees will be required to change their password.
   
2. **Admin Login or Registration:**
   - Register as an admin if you don't have an account.
   - Use your admin credentials to log in and manage employee records and departments.

3. **Employee Login:**
   - Access the employee login page at `/employeeLogin`.
   - Use your employee credentials to log in and view your dashboard.

4. **Dashboard:**
   - Admins can navigate to the admin dashboard to manage employees and departments.
   - Employees can view their personal details and submit leave requests.

## Demo
Click on the link below to see the live demo:

https://employee-management-app-ktfx.onrender.com/

## Responsiveness

Due to the nature of this application, which is primarily intended for use on desktops and ipads by HR personnel and managers, responsiveness for mobile views has not been implemented. The application is designed to be used on larger screens where users can efficiently manage and view detailed employee information.

## Known Issues

- **Dependency Conflicts:** Some backend packages required the use of `npm install --force` due to compatibility issues.
- **Mobile Responsiveness:** As stated above, the application is not optimized for mobile devices.

## Contact

For any questions or inquiries, please contact [kworlanyo@gmail.com](mailto:kworlanyo@gmail.com).

---

Thank you for using the AdminHub Employee Management Application! Your contributions and feedback are highly appreciated.