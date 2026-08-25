# Employee Management System (EMS Pro)

A modern, full-stack **Employee Management System (EMS Pro)** built with React 19, TypeScript, and Tailwind CSS, featuring an interactive MySQL Studio, PHP/PDO backend templates, attendance tracking, department management, and financial analytics formatted in Bangladeshi Taka (৳).

---

## 🌟 Key Features

### 1. 🔐 Dedicated Admin Authentication
- Secure authentication screen with admin credentials validation.
- Default credentials provided for instant testing:
  - **Username:** `admin` (or `admin@company.bd`)
  - **Password:** `admin123`
- Session persistence via LocalStorage with graceful logout.

### 2. 📊 Interactive Dashboard & Metrics
- Real-time KPI summary cards: Total Employees, Active Departments, Present Today, and Total Monthly Payroll (৳).
- Department headcount distribution and salary expense breakdowns.
- Today's attendance tracker with quick status indicators (`Present`, `Late`, `Absent`, `Half Day`).
- Quick-action buttons to directly add Employees, Departments, or Attendance records.

### 3. 👥 Employee Management (CRUD)
- Complete employee directory with searching, department filtering, and pagination.
- Detailed modal views and forms for adding/editing employees:
  - Full Name (Bengali & English supported)
  - Gender, Date of Birth, Phone Number, Email, Residential Address
  - Department assignment, Designation, Monthly Salary (৳), Joining Date.
- Profile details viewer with contact and salary breakdown.

### 4. 🏢 Department Management
- Create, view, update, and remove company departments.
- Assign Department Managers and view total assigned personnel per department.
- Real-time aggregate payroll calculation per department.

### 5. ⏱️ Attendance Tracking & Logs
- Daily check-in and check-out tracking with timestamps.
- Status classification: **Present**, **Late**, **Absent**, and **Half Day**.
- Date-based log filtering, employee search, and manual check-in modal.

### 6. 📈 Reports & Financial Analytics
- Summary charts and tables visualizing monthly salary expenditures in Bangladeshi Taka (৳).
- Department payroll totals and average salary calculations.
- Highest-paid personnel roster and export-ready data summaries.

### 7. 🗄️ Interactive MySQL Studio
- In-browser SQL console supporting custom SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`).
- Pre-built query presets:
  - Full Employee Roster with Department JOINs
  - Department Staff & Payroll summaries
  - Today's Late Attendance Logs
  - High Earners (৳80,000+)
- Visual table inspector for `departments`, `employees`, `attendance`, and `admin_users`.

### 8. 💻 Native PHP & MySQL Code Hub
- Complete, production-ready PHP/PDO source code templates:
  - `db_config.php` (PDO database connection with error handling)
  - `employees.php`, `departments.php`, `attendance.php` (CRUD controllers)
  - `login.php` & `auth_check.php` (Bcrypt password verification & session management)
  - `export_csv.php` (Report generation)
- One-click copy for all PHP snippets.

---

## 🗃️ Database Schema

The complete MySQL database schema is available in [`/schema.sql`](./schema.sql) and [`/public/schema.sql`](./public/schema.sql).

### Tables Overview:
```sql
CREATE DATABASE IF NOT EXISTS `ems_db`;
USE `ems_db`;

-- 1. Departments Table
CREATE TABLE `departments` (
  `Department_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Department_Name` VARCHAR(100) NOT NULL,
  `Manager_Name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Employees Table
CREATE TABLE `employees` (
  `Employee_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Name` VARCHAR(100) NOT NULL,
  `Gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `DOB` DATE NOT NULL,
  `Phone` VARCHAR(25) NOT NULL,
  `Email` VARCHAR(100) NOT NULL UNIQUE,
  `Address` TEXT NOT NULL,
  `Department_ID` INT NOT NULL,
  `Designation` VARCHAR(100) NOT NULL,
  `Salary` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `Join_Date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`Department_ID`) REFERENCES `departments`(`Department_ID`) ON DELETE CASCADE
);

-- 3. Attendance Table
CREATE TABLE `attendance` (
  `Attendance_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Employee_ID` INT NOT NULL,
  `Attendance_Date` DATE NOT NULL,
  `Check_In` TIME DEFAULT NULL,
  `Check_Out` TIME DEFAULT NULL,
  `Status` ENUM('Present', 'Absent', 'Late', 'Half Day') NOT NULL DEFAULT 'Present',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`Employee_ID`) REFERENCES `employees`(`Employee_ID`) ON DELETE CASCADE
);

-- 4. Admin Users Table
CREATE TABLE `admin_users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **bun** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port 3000 |
| `npm run build` | Builds optimized production static bundle in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`) |

---

## 📂 Project Structure

```
├── public/
│   └── schema.sql             # Static downloadable MySQL schema & seeds
├── schema.sql                 # Root MySQL database schema
├── src/
│   ├── components/
│   │   ├── AdminLogin.tsx     # Fullscreen Admin login portal
│   │   ├── Attendance.tsx     # Attendance records & filtering
│   │   ├── AttendanceModal.tsx# Attendance entry dialog
│   │   ├── ConfirmDeleteModal.tsx
│   │   ├── Dashboard.tsx      # Analytics & overview metrics
│   │   ├── DepartmentModal.tsx# Department creation/edit modal
│   │   ├── Departments.tsx    # Departments directory
│   │   ├── EmployeeModal.tsx  # Employee CRUD form modal
│   │   ├── Employees.tsx      # Employee directory table & actions
│   │   ├── MysqlStudio.tsx    # In-browser MySQL interactive query console
│   │   ├── Navbar.tsx         # Application header navigation
│   │   ├── PhpCodeHub.tsx     # Full PHP & PDO code template library
│   │   └── Reports.tsx        # Department & Salary reports
│   ├── data/
│   │   ├── initialData.ts     # Default Bengali employee seed data
│   │   └── phpCodeTemplates.ts# Production PHP backend code files
│   ├── types.ts               # Shared TypeScript data models
│   ├── App.tsx                # Main application entry point & router
│   ├── main.tsx               # DOM mount point
│   └── index.css              # Tailwind CSS styles
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🛡️ Default Admin Credentials

| Role | Username / Email | Password |
| :--- | :--- | :--- |
| **System Administrator** | `admin` / `admin@company.bd` | `admin123` |

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute for educational or commercial projects.
