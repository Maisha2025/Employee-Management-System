export interface Department {
  Department_ID: number;
  Department_Name: string;
  Manager_Name: string;
}

export interface Employee {
  Employee_ID: number;
  Name: string;
  Gender: 'Male' | 'Female' | 'Other';
  DOB: string;
  Phone: string;
  Email: string;
  Address: string;
  Department_ID: number;
  Designation: string;
  Salary: number;
  Join_Date: string;
}

export interface Attendance {
  Attendance_ID: number;
  Employee_ID: number;
  Attendance_Date: string;
  Check_In: string;
  Check_Out: string;
  Status: 'Present' | 'Absent' | 'Late' | 'Half Day';
}

export interface EmployeeWithDepartment extends Employee {
  Department_Name: string;
  Manager_Name: string;
}

export interface AttendanceWithEmployee extends Attendance {
  Employee_Name: string;
  Department_Name: string;
  Designation: string;
}

export type TabType = 'dashboard' | 'departments' | 'employees' | 'attendance' | 'reports' | 'codehub' | 'mysql';

export interface PhpCodeFile {
  filename: string;
  category: 'database' | 'includes' | 'pages';
  description: string;
  code: string;
}
