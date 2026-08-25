import { Department, Employee, Attendance } from '../types';

export const initialDepartments: Department[] = [
  { Department_ID: 1, Department_Name: 'Human Resources', Manager_Name: 'শ্রাবন্তী সেন (Srabanti Sen)' },
  { Department_ID: 2, Department_Name: 'Engineering', Manager_Name: 'তানভীর আহমেদ (Tanvir Ahmed)' },
  { Department_ID: 3, Department_Name: 'Finance', Manager_Name: 'আরিফ হোসেন (Arif Hossain)' },
  { Department_ID: 4, Department_Name: 'Marketing', Manager_Name: 'অনন্যা মুখার্জী (Ananya Mukherjee)' },
  { Department_ID: 5, Department_Name: 'Operations', Manager_Name: 'সৌম্য সমাদ্দার (Soumya Samaddar)' }
];

export const initialEmployees: Employee[] = [
  {
    Employee_ID: 101,
    Name: 'তানিম রহমান (Tanim Rahman)',
    Gender: 'Male',
    DOB: '1990-05-14',
    Phone: '+880 1711-234567',
    Email: 'tanim.rahman@company.bd',
    Address: '১২৪ আইটি পার্ক, গুলশান, ঢাকা',
    Department_ID: 2,
    Designation: 'Senior Lead Software Engineer',
    Salary: 95000.00,
    Join_Date: '2021-03-15'
  },
  {
    Employee_ID: 102,
    Name: 'নুসরাত জাহান (Nusrat Jahan)',
    Gender: 'Female',
    DOB: '1993-08-22',
    Phone: '+880 1812-876543',
    Email: 'nusrat.jahan@company.bd',
    Address: '৪৫৬ গ্র্যান্ড এভিনিউ, ধানমন্ডি, ঢাকা',
    Department_ID: 1,
    Designation: 'HR Operations Manager',
    Salary: 72000.00,
    Join_Date: '2022-01-10'
  },
  {
    Employee_ID: 103,
    Name: 'অর্ঘ্য চৌধুরী (Arghya Chowdhury)',
    Gender: 'Male',
    DOB: '1988-11-30',
    Phone: '+880 1913-345678',
    Email: 'arghya.chowdhury@company.bd',
    Address: '৭৮৯ মতিঝিল বা/এ, ঢাকা',
    Department_ID: 3,
    Designation: 'Senior Financial Analyst',
    Salary: 84000.00,
    Join_Date: '2020-07-01'
  },
  {
    Employee_ID: 104,
    Name: 'অনন্যা মুখার্জী (Ananya Mukherjee)',
    Gender: 'Female',
    DOB: '1995-02-18',
    Phone: '+880 1614-901234',
    Email: 'ananya.mukherjee@company.bd',
    Address: '৩২১ ক্রিয়েটিভ লেন, বনানী, ঢাকা',
    Department_ID: 4,
    Designation: 'Digital Marketing Strategist',
    Salary: 68000.00,
    Join_Date: '2023-04-18'
  },
  {
    Employee_ID: 105,
    Name: 'মেহেদী হাসান (Mehedi Hasan)',
    Gender: 'Male',
    DOB: '1992-09-05',
    Phone: '+880 1515-456789',
    Email: 'mehedi.hasan@company.bd',
    Address: '৫৫৫ টেক হাব, উত্তরা, ঢাকা',
    Department_ID: 2,
    Designation: 'Full Stack Developer',
    Salary: 82000.00,
    Join_Date: '2022-09-01'
  },
  {
    Employee_ID: 106,
    Name: 'সাদিয়া ইসলাম (Sadia Islam)',
    Gender: 'Female',
    DOB: '1991-12-12',
    Phone: '+880 1316-678901',
    Email: 'sadia.islam@company.bd',
    Address: '৮৮৮ সিডিএ আবাসিক এলাকা, চট্টগ্রাম',
    Department_ID: 5,
    Designation: 'Operations Coordinator',
    Salary: 61000.00,
    Join_Date: '2021-11-15'
  }
];

export const initialAttendance: Attendance[] = [
  { Attendance_ID: 1, Employee_ID: 101, Attendance_Date: '2026-08-06', Check_In: '08:55:00', Check_Out: '17:05:00', Status: 'Present' },
  { Attendance_ID: 2, Employee_ID: 102, Attendance_Date: '2026-08-06', Check_In: '09:02:00', Check_Out: '17:00:00', Status: 'Present' },
  { Attendance_ID: 3, Employee_ID: 103, Attendance_Date: '2026-08-06', Check_In: '09:25:00', Check_Out: '17:30:00', Status: 'Late' },
  { Attendance_ID: 4, Employee_ID: 104, Attendance_Date: '2026-08-06', Check_In: '08:45:00', Check_Out: '17:15:00', Status: 'Present' },
  { Attendance_ID: 5, Employee_ID: 105, Attendance_Date: '2026-08-06', Check_In: '00:00:00', Check_Out: '00:00:00', Status: 'Absent' },
  { Attendance_ID: 6, Employee_ID: 106, Attendance_Date: '2026-08-06', Check_In: '09:00:00', Check_Out: '13:00:00', Status: 'Half Day' },
  
  // Previous day
  { Attendance_ID: 7, Employee_ID: 101, Attendance_Date: '2026-08-05', Check_In: '08:50:00', Check_Out: '17:10:00', Status: 'Present' },
  { Attendance_ID: 8, Employee_ID: 102, Attendance_Date: '2026-08-05', Check_In: '08:58:00', Check_Out: '17:00:00', Status: 'Present' },
  { Attendance_ID: 9, Employee_ID: 103, Attendance_Date: '2026-08-05', Check_In: '09:00:00', Check_Out: '17:00:00', Status: 'Present' },
  { Attendance_ID: 10, Employee_ID: 104, Attendance_Date: '2026-08-05', Check_In: '09:15:00', Check_Out: '17:00:00', Status: 'Late' },
  { Attendance_ID: 11, Employee_ID: 105, Attendance_Date: '2026-08-05', Check_In: '08:40:00', Check_Out: '17:00:00', Status: 'Present' },
  { Attendance_ID: 12, Employee_ID: 106, Attendance_Date: '2026-08-05', Check_In: '08:55:00', Check_Out: '17:05:00', Status: 'Present' }
];
