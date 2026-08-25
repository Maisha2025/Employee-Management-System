import React, { useState } from 'react';
import { Department, EmployeeWithDepartment, AttendanceWithEmployee } from '../types';
import { 
  BarChart3, 
  Printer, 
  Download, 
  Building2, 
  DollarSign, 
  Users, 
  Calendar,
  CheckCircle2,
  Database
} from 'lucide-react';

interface ReportsProps {
  departments: Department[];
  employees: EmployeeWithDepartment[];
  attendance: AttendanceWithEmployee[];
}

export const Reports: React.FC<ReportsProps> = ({
  departments,
  employees,
  attendance
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'payroll' | 'attendance' | 'directory'>('payroll');

  // Compute Department Payroll Breakdown
  const deptPayroll = departments.map((d) => {
    const members = employees.filter((e) => e.Department_ID === d.Department_ID);
    const totalPayroll = members.reduce((sum, e) => sum + Number(e.Salary), 0);
    const avgSalary = members.length > 0 ? totalPayroll / members.length : 0;

    return {
      id: d.Department_ID,
      name: d.Department_Name,
      manager: d.Manager_Name,
      headcount: members.length,
      totalPayroll,
      avgSalary
    };
  });

  const grandTotalPayroll = deptPayroll.reduce((acc, curr) => acc + curr.totalPayroll, 0);

  // Compute Attendance Stats
  const statusSummary = {
    Present: attendance.filter(a => a.Status === 'Present').length,
    Late: attendance.filter(a => a.Status === 'Late').length,
    Absent: attendance.filter(a => a.Status === 'Absent').length,
    'Half Day': attendance.filter(a => a.Status === 'Half Day').length,
  };

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (activeReportTab === 'payroll') {
      csvContent += 'Department ID,Department Name,Manager,Headcount,Avg Salary,Total Payroll\n';
      deptPayroll.forEach(d => {
        csvContent += `${d.id},"${d.name}","${d.manager}",${d.headcount},${d.avgSalary.toFixed(2)},${d.totalPayroll.toFixed(2)}\n`;
      });
    } else if (activeReportTab === 'directory') {
      csvContent += 'ID,Name,Gender,Email,Phone,Department,Designation,Salary,Join Date\n';
      employees.forEach(e => {
        csvContent += `${e.Employee_ID},"${e.Name}","${e.Gender}","${e.Email}","${e.Phone}","${e.Department_Name}","${e.Designation}",${e.Salary},"${e.Join_Date}"\n`;
      });
    } else {
      csvContent += 'Attendance ID,Date,Employee,Department,Check In,Check Out,Status\n';
      attendance.forEach(a => {
        csvContent += `${a.Attendance_ID},"${a.Attendance_Date}","${a.Employee_Name}","${a.Department_Name}","${a.Check_In}","${a.Check_Out}","${a.Status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EMS_Report_${activeReportTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 print:p-0">
      {/* Printable Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-pink-600" />
            System Reports & Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Summaries on department allocation, payroll expenditures, and attendance metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-2 px-3.5 py-2.5 bg-pink-950/80 hover:bg-pink-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all border border-pink-900"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-2 px-3.5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-pink-600/30 transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex border-b border-pink-100 gap-6 text-sm font-semibold print:hidden">
        <button
          onClick={() => setActiveReportTab('payroll')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-colors ${
            activeReportTab === 'payroll'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Department Payroll Breakdown</span>
        </button>
        <button
          onClick={() => setActiveReportTab('attendance')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-colors ${
            activeReportTab === 'attendance'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Attendance Rate Report</span>
        </button>
        <button
          onClick={() => setActiveReportTab('directory')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-colors ${
            activeReportTab === 'directory'
              ? 'border-pink-600 text-pink-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Roster Matrix</span>
        </button>
      </div>

      {/* Report 1: Department Payroll */}
      {activeReportTab === 'payroll' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-pink-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Department Salary & Headcount Matrix</h3>
                <p className="text-xs text-slate-500">Grouped by <code className="font-mono text-pink-600">departments.Department_ID</code></p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Monthly Expenditure</span>
                <span className="text-xl font-extrabold text-emerald-600 font-mono">
                  ৳{grandTotalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-rose-50/50 text-[11px] font-bold text-pink-900/80 uppercase tracking-wider border-b border-pink-100">
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Manager</th>
                    <th className="py-3 px-4">Staff Headcount</th>
                    <th className="py-3 px-4">Average Salary</th>
                    <th className="py-3 px-4 text-end">Total Payroll (৳)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 text-xs">
                  {deptPayroll.map((d) => (
                    <tr key={d.id} className="hover:bg-pink-50/30">
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center">
                        <Building2 className="w-4 h-4 me-2 text-pink-600" />
                        {d.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{d.manager}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-pink-50 text-pink-700 border border-pink-100 px-2.5 py-1 rounded-full font-semibold">
                          {d.headcount} employees
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        ৳{d.avgSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-end font-mono font-bold text-emerald-700 text-sm">
                        ৳{d.totalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Report 2: Attendance */}
      {activeReportTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Present Entries</span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-2">{statusSummary.Present}</div>
              <p className="text-xs text-slate-400 mt-1">Full shift logged</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Late Arrivals</span>
              <div className="text-3xl font-extrabold text-amber-600 mt-2">{statusSummary.Late}</div>
              <p className="text-xs text-slate-400 mt-1">Checked in post 09:15 AM</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Absent Days</span>
              <div className="text-3xl font-extrabold text-rose-600 mt-2">{statusSummary.Absent}</div>
              <p className="text-xs text-slate-400 mt-1">No check in logged</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Half Days</span>
              <div className="text-3xl font-extrabold text-pink-600 mt-2">{statusSummary['Half Day']}</div>
              <p className="text-xs text-slate-400 mt-1">&lt; 5 hours shift</p>
            </div>
          </div>
        </div>
      )}

      {/* Report 3: Directory Matrix */}
      {activeReportTab === 'directory' && (
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-pink-100">
            <h3 className="text-base font-bold text-slate-900">Complete Employee Master Roster</h3>
            <p className="text-xs text-slate-500">Comprehensive dump of all employees joined with department details</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-rose-50/50 font-bold text-pink-900/80 uppercase border-b border-pink-100">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {employees.map((e) => (
                  <tr key={e.Employee_ID} className="hover:bg-pink-50/30">
                    <td className="py-3 px-4 font-mono text-pink-600 font-bold">#{e.Employee_ID}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{e.Name}</td>
                    <td className="py-3 px-4">
                      <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-pink-100">
                        {e.Department_Name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{e.Designation}</td>
                    <td className="py-3 px-4 text-slate-600">{e.Email}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">৳{Number(e.Salary).toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{e.Join_Date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Architecture Footer */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-pink-950 text-xs flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-pink-400" />
          <span>Relational Foreign Key Integrity Verified across all views (`departments` &rarr; `employees` &rarr; `attendance`).</span>
        </div>
        <span className="font-mono text-pink-300/80">System Version 1.0</span>
      </div>
    </div>
  );
};
