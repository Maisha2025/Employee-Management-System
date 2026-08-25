import React, { useState, useEffect } from 'react';
import { Department, Employee, Attendance, TabType, EmployeeWithDepartment, AttendanceWithEmployee } from './types';
import { initialDepartments, initialEmployees, initialAttendance } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Departments } from './components/Departments';
import { Employees } from './components/Employees';
import { Attendance as AttendanceComponent } from './components/Attendance';
import { Reports } from './components/Reports';
import { PhpCodeHub } from './components/PhpCodeHub';
import { MysqlStudio } from './components/MysqlStudio';
import { AdminLogin } from './components/AdminLogin';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { EmployeeModal } from './components/EmployeeModal';
import { DepartmentModal } from './components/DepartmentModal';
import { AttendanceModal } from './components/AttendanceModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('ems_admin_logged_in');
    return saved !== null ? saved === 'true' : true;
  });
  const [adminName, setAdminName] = useState<string>(() => {
    return localStorage.getItem('ems_admin_name') || 'System Administrator';
  });

  const handleLoginSuccess = (name: string) => {
    setIsAdminLoggedIn(true);
    setAdminName(name);
    localStorage.setItem('ems_admin_logged_in', 'true');
    localStorage.setItem('ems_admin_name', name);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.setItem('ems_admin_logged_in', 'false');
  };

  // Local storage state initialization with auto-migration to Bengali data version
  const DATA_VERSION = 'ems_v3_bengali_taka';

  const [departments, setDepartments] = useState<Department[]>(() => {
    const currentVersion = localStorage.getItem('ems_data_version');
    if (currentVersion !== DATA_VERSION) {
      localStorage.setItem('ems_data_version', DATA_VERSION);
      localStorage.setItem('ems_departments', JSON.stringify(initialDepartments));
      localStorage.setItem('ems_employees', JSON.stringify(initialEmployees));
      localStorage.setItem('ems_attendance', JSON.stringify(initialAttendance));
      return initialDepartments;
    }
    const saved = localStorage.getItem('ems_departments');
    return saved ? JSON.parse(saved) : initialDepartments;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const currentVersion = localStorage.getItem('ems_data_version');
    if (currentVersion !== DATA_VERSION) {
      return initialEmployees;
    }
    const saved = localStorage.getItem('ems_employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [attendance, setAttendance] = useState<Attendance[]>(() => {
    const currentVersion = localStorage.getItem('ems_data_version');
    if (currentVersion !== DATA_VERSION) {
      return initialAttendance;
    }
    const saved = localStorage.getItem('ems_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  // Modal shortcut triggers
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [isAddAttModalOpen, setIsAddAttModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ems_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('ems_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ems_attendance', JSON.stringify(attendance));
  }, [attendance]);

  // Reset sample data handler
  const handleResetData = () => {
    setIsResetConfirmOpen(true);
  };

  const handleConfirmReset = () => {
    setDepartments(initialDepartments);
    setEmployees(initialEmployees);
    setAttendance(initialAttendance);
    localStorage.removeItem('ems_departments');
    localStorage.removeItem('ems_employees');
    localStorage.removeItem('ems_attendance');
    setIsResetConfirmOpen(false);
  };

  // Helper getters for JOINs
  const employeesWithDepartment: EmployeeWithDepartment[] = employees.map((e) => {
    const dept = departments.find((d) => d.Department_ID === e.Department_ID);
    return {
      ...e,
      Department_Name: dept ? dept.Department_Name : 'Unassigned',
      Manager_Name: dept ? dept.Manager_Name : 'N/A'
    };
  });

  const attendanceWithEmployee: AttendanceWithEmployee[] = attendance.map((a) => {
    const emp = employeesWithDepartment.find((e) => e.Employee_ID === a.Employee_ID);
    return {
      ...a,
      Employee_Name: emp ? emp.Name : 'Unknown Employee',
      Department_Name: emp ? emp.Department_Name : 'N/A',
      Designation: emp ? emp.Designation : 'N/A'
    };
  });

  // Department CRUD Handlers
  const handleAddDepartment = (dept: Partial<Department>) => {
    const nextId = departments.length > 0 ? Math.max(...departments.map(d => d.Department_ID)) + 1 : 1;
    const newDept: Department = {
      Department_ID: nextId,
      Department_Name: dept.Department_Name || 'New Department',
      Manager_Name: dept.Manager_Name || 'Manager'
    };
    setDepartments(prev => [...prev, newDept]);
  };

  const handleUpdateDepartment = (dept: Partial<Department>) => {
    setDepartments(prev => prev.map(d => d.Department_ID === dept.Department_ID ? { ...d, ...dept } as Department : d));
  };

  const handleDeleteDepartment = (deptId: number) => {
    const assignedCount = employees.filter(e => e.Department_ID === deptId).length;
    if (assignedCount > 0) {
      return {
        success: false,
        message: `Foreign Key Violation: Department ID ${deptId} is assigned to ${assignedCount} employee(s). Cannot delete.`
      };
    }
    setDepartments(prev => prev.filter(d => d.Department_ID !== deptId));
    return { success: true };
  };

  // Employee CRUD Handlers
  const handleAddEmployee = (emp: Partial<Employee>) => {
    const nextId = employees.length > 0 ? Math.max(...employees.map(e => e.Employee_ID)) + 1 : 101;
    const newEmp: Employee = {
      Employee_ID: nextId,
      Name: emp.Name || 'John Doe',
      Gender: emp.Gender || 'Male',
      DOB: emp.DOB || '1995-01-01',
      Phone: emp.Phone || '+1 (555) 000-0000',
      Email: emp.Email || `emp${nextId}@company.com`,
      Address: emp.Address || 'Company HQ',
      Department_ID: emp.Department_ID || departments[0]?.Department_ID || 1,
      Designation: emp.Designation || 'Staff',
      Salary: Number(emp.Salary) || 50000,
      Join_Date: emp.Join_Date || new Date().toISOString().split('T')[0]
    };
    setEmployees(prev => [newEmp, ...prev]);
  };

  const handleUpdateEmployee = (emp: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.Employee_ID === emp.Employee_ID ? { ...e, ...emp } as Employee : e));
  };

  const handleDeleteEmployee = (empId: number) => {
    setEmployees(prev => prev.filter(e => e.Employee_ID !== empId));
    // Cascade delete attendance logs for this employee (ON DELETE CASCADE)
    setAttendance(prev => prev.filter(a => a.Employee_ID !== empId));
  };

  // Attendance CRUD Handlers
  const handleAddAttendance = (att: Partial<Attendance>) => {
    const nextId = attendance.length > 0 ? Math.max(...attendance.map(a => a.Attendance_ID)) + 1 : 1;
    const newAtt: Attendance = {
      Attendance_ID: nextId,
      Employee_ID: att.Employee_ID || employees[0]?.Employee_ID || 101,
      Attendance_Date: att.Attendance_Date || new Date().toISOString().split('T')[0],
      Check_In: att.Check_In || '09:00:00',
      Check_Out: att.Check_Out || '17:00:00',
      Status: att.Status || 'Present'
    };
    setAttendance(prev => [newAtt, ...prev]);
  };

  const handleUpdateAttendance = (att: Partial<Attendance>) => {
    setAttendance(prev => prev.map(a => a.Attendance_ID === att.Attendance_ID ? { ...a, ...att } as Attendance : a));
  };

  const handleDeleteAttendance = (attId: number) => {
    setAttendance(prev => prev.filter(a => a.Attendance_ID !== attId));
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayPresent = attendance.filter(a => (a.Attendance_Date === todayStr || a.Attendance_Date === '2026-08-06') && (a.Status === 'Present' || a.Status === 'Late')).length;

  if (!isAdminLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans text-slate-800 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalEmployees={employees.length}
        totalDepartments={departments.length}
        todayPresent={todayPresent}
        isAdminLoggedIn={isAdminLoggedIn}
        adminName={adminName}
        onLogout={handleLogout}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            departments={departments}
            employees={employees}
            attendance={attendanceWithEmployee}
            setActiveTab={setActiveTab}
            onOpenAddEmp={() => setIsAddEmpModalOpen(true)}
            onOpenAddDept={() => setIsAddDeptModalOpen(true)}
            onOpenAddAtt={() => setIsAddAttModalOpen(true)}
          />
        )}

            {activeTab === 'departments' && (
              <Departments
                departments={departments}
                employees={employees}
                onAddDepartment={handleAddDepartment}
                onUpdateDepartment={handleUpdateDepartment}
                onDeleteDepartment={handleDeleteDepartment}
              />
            )}

            {activeTab === 'employees' && (
              <Employees
                employees={employeesWithDepartment}
                departments={departments}
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            )}

            {activeTab === 'attendance' && (
              <AttendanceComponent
                attendance={attendanceWithEmployee}
                employees={employeesWithDepartment}
                onAddAttendance={handleAddAttendance}
                onUpdateAttendance={handleUpdateAttendance}
                onDeleteAttendance={handleDeleteAttendance}
              />
            )}

            {activeTab === 'reports' && (
              <Reports
                departments={departments}
                employees={employeesWithDepartment}
                attendance={attendanceWithEmployee}
              />
            )}

            {activeTab === 'mysql' && (
              <MysqlStudio
                departments={departments}
                employees={employeesWithDepartment}
                attendance={attendanceWithEmployee}
                onAddDepartment={handleAddDepartment}
                onUpdateDepartment={handleUpdateDepartment}
                onDeleteDepartment={handleDeleteDepartment}
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
                onAddAttendance={handleAddAttendance}
                onDeleteAttendance={handleDeleteAttendance}
              />
            )}

            {activeTab === 'codehub' && <PhpCodeHub />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-4 text-center text-xs text-slate-500 mt-auto shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-pink-900 font-bold">Employee Management System (EMS)</strong> &bull; Production Ready PHP & MySQL Architecture
          </div>
          <div className="flex items-center space-x-3 text-pink-600/70 font-mono">
            <span>MySQL XAMPP Compatible</span>
            <span>&bull;</span>
            <span>Bootstrap 5 Layout</span>
          </div>
        </div>
      </footer>

      {/* Shortcut Modals */}
      <EmployeeModal
        isOpen={isAddEmpModalOpen}
        onClose={() => setIsAddEmpModalOpen(false)}
        onSave={handleAddEmployee}
        departments={departments}
      />

      <DepartmentModal
        isOpen={isAddDeptModalOpen}
        onClose={() => setIsAddDeptModalOpen(false)}
        onSave={handleAddDepartment}
      />

      <AttendanceModal
        isOpen={isAddAttModalOpen}
        onClose={() => setIsAddAttModalOpen(false)}
        onSave={handleAddAttendance}
        employees={employeesWithDepartment}
      />

      <ConfirmDeleteModal
        isOpen={isResetConfirmOpen}
        title="Reset All MySQL Database Tables"
        message="Are you sure you want to re-initialize all departments, employees, and attendance data back to initial sample values?"
        warningNote="This will execute TRUNCATE / DROP & RE-SEED SQL commands on all tables in ems_db."
        confirmText="Reset Database"
        onConfirm={handleConfirmReset}
        onClose={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
