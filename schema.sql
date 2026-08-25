-- ============================================================
-- EMPLOYEE MANAGEMENT SYSTEM (EMS PRO)
-- Complete MySQL Database Schema & Initial Seed Data
-- Database: ems_db
-- Encoding: UTF-8 (utf8mb4_unicode_ci)
-- Currency: Bangladeshi Taka (৳)
-- ============================================================

CREATE DATABASE IF NOT EXISTS `ems_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ems_db`;

-- ------------------------------------------------------------
-- 1. Table: departments
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `attendance`;
DROP TABLE IF EXISTS `employees`;
DROP TABLE IF EXISTS `departments`;
DROP TABLE IF EXISTS `admin_users`;

CREATE TABLE `departments` (
  `Department_ID` INT NOT NULL AUTO_INCREMENT,
  `Department_Name` VARCHAR(100) NOT NULL,
  `Manager_Name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Department_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Table: employees
-- ------------------------------------------------------------
CREATE TABLE `employees` (
  `Employee_ID` INT NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`Employee_ID`),
  CONSTRAINT `fk_employees_department` 
    FOREIGN KEY (`Department_ID`) 
    REFERENCES `departments` (`Department_ID`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Table: attendance
-- ------------------------------------------------------------
CREATE TABLE `attendance` (
  `Attendance_ID` INT NOT NULL AUTO_INCREMENT,
  `Employee_ID` INT NOT NULL,
  `Attendance_Date` DATE NOT NULL,
  `Check_In` TIME DEFAULT NULL,
  `Check_Out` TIME DEFAULT NULL,
  `Status` ENUM('Present', 'Absent', 'Late', 'Half Day') NOT NULL DEFAULT 'Present',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Attendance_ID`),
  CONSTRAINT `fk_attendance_employee` 
    FOREIGN KEY (`Employee_ID`) 
    REFERENCES `employees` (`Employee_ID`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. Table: admin_users (System Administrators)
-- ------------------------------------------------------------
CREATE TABLE `admin_users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA (Departments, Employees, Attendance, Admins)
-- ============================================================

-- Insert Departments
INSERT INTO `departments` (`Department_ID`, `Department_Name`, `Manager_Name`) VALUES
(1, 'Human Resources', 'শ্রাবন্তী সেন (Srabanti Sen)'),
(2, 'Engineering', 'তানভীর আহমেদ (Tanvir Ahmed)'),
(3, 'Finance', 'আরিফ হোসেন (Arif Hossain)'),
(4, 'Marketing', 'অনন্যা মুখার্জী (Ananya Mukherjee)'),
(5, 'Operations', 'সৌম্য সমাদ্দার (Soumya Samaddar)');

-- Insert Employees (Salaries in Bangladeshi Taka ৳)
INSERT INTO `employees` (`Employee_ID`, `Name`, `Gender`, `DOB`, `Phone`, `Email`, `Address`, `Department_ID`, `Designation`, `Salary`, `Join_Date`) VALUES
(101, 'তানিম রহমান (Tanim Rahman)', 'Male', '1990-05-14', '+880 1711-234567', 'tanim.rahman@company.bd', '১২৪ আইটি পার্ক, গুলশান, ঢাকা', 2, 'Senior Lead Software Engineer', 95000.00, '2021-03-15'),
(102, 'নুসরাত জাহান (Nusrat Jahan)', 'Female', '1993-08-22', '+880 1812-876543', 'nusrat.jahan@company.bd', '৪৫৬ গ্র্যান্ড এভিনিউ, ধানমন্ডি, ঢাকা', 1, 'HR Operations Manager', 72000.00, '2022-01-10'),
(103, 'অর্ঘ্য চৌধুরী (Arghya Chowdhury)', 'Male', '1988-11-30', '+880 1913-345678', 'arghya.chowdhury@company.bd', '৭৮৯ মতিঝিল বা/এ, ঢাকা', 3, 'Senior Financial Analyst', 84000.00, '2020-07-01'),
(104, 'অনন্যা মুখার্জী (Ananya Mukherjee)', 'Female', '1995-02-18', '+880 1614-901234', 'ananya.mukherjee@company.bd', '৩২১ ক্রিয়েটিভ লেন, বনানী, ঢাকা', 4, 'Digital Marketing Strategist', 68000.00, '2023-04-18'),
(105, 'মেহেদী হাসান (Mehedi Hasan)', 'Male', '1992-09-05', '+880 1515-456789', 'mehedi.hasan@company.bd', '৫৫৫ টেক হাব, উত্তরা, ঢাকা', 2, 'Full Stack Developer', 82000.00, '2022-09-01'),
(106, 'সাদিয়া ইসলাম (Sadia Islam)', 'Female', '1991-12-12', '+880 1316-678901', 'sadia.islam@company.bd', '৮৮৮ সিডিএ আবাসিক এলাকা, চট্টগ্রাম', 5, 'Operations Coordinator', 61000.00, '2021-11-15');

-- Insert Attendance Records
INSERT INTO `attendance` (`Attendance_ID`, `Employee_ID`, `Attendance_Date`, `Check_In`, `Check_Out`, `Status`) VALUES
(1, 101, CURDATE(), '08:55:00', '17:05:00', 'Present'),
(2, 102, CURDATE(), '09:02:00', '17:00:00', 'Present'),
(3, 103, CURDATE(), '09:25:00', '17:30:00', 'Late'),
(4, 104, CURDATE(), '08:45:00', '17:15:00', 'Present'),
(5, 105, CURDATE(), '00:00:00', '00:00:00', 'Absent'),
(6, 106, CURDATE(), '09:00:00', '13:00:00', 'Half Day');

-- Insert Default Admin User (Password: admin123 hashed with bcrypt)
INSERT INTO `admin_users` (`user_id`, `username`, `email`, `password_hash`, `full_name`, `role`) VALUES
(1, 'admin', 'admin@company.bd', '$2y$10$4y9pS/G9kE.9r10x1Z4S7.wO6w10S1r7G.Z1X1y0k1Z4S7wO6w10S', 'System Administrator', 'admin');

-- ============================================================
-- HELPFUL SQL VIEWS & QUERIES
-- ============================================================

-- View: Employee Details with Department Names
CREATE OR REPLACE VIEW `vw_employee_details` AS
SELECT 
  e.Employee_ID,
  e.Name AS Employee_Name,
  e.Gender,
  e.DOB,
  e.Phone,
  e.Email,
  e.Address,
  d.Department_Name,
  d.Manager_Name,
  e.Designation,
  e.Salary,
  e.Join_Date
FROM employees e
JOIN departments d ON e.Department_ID = d.Department_ID;

-- View: Department Payroll & Staff Summary
CREATE OR REPLACE VIEW `vw_department_summary` AS
SELECT 
  d.Department_ID,
  d.Department_Name,
  d.Manager_Name,
  COUNT(e.Employee_ID) AS Total_Employees,
  IFNULL(SUM(e.Salary), 0) AS Total_Payroll,
  IFNULL(AVG(e.Salary), 0) AS Average_Salary
FROM departments d
LEFT JOIN employees e ON d.Department_ID = e.Department_ID
GROUP BY d.Department_ID, d.Department_Name, d.Manager_Name;
