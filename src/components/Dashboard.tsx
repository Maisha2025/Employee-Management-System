import React from 'react';
import { Department, Employee, AttendanceWithEmployee, TabType } from '../types';
import { 
  Users, 
  Building2, 
  CalendarCheck, 
  DollarSign, 
  UserPlus, 
  FolderPlus, 
  Clock, 
  ArrowUpRight,
  Code2,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  departments: Department[];
  employees: Employee[];
  attendance: AttendanceWithEmployee[];
  setActiveTab: (tab: TabType) => void;
  onOpenAddEmp: () => void;
  onOpenAddDept: () => void;
  onOpenAddAtt: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  departments,
  employees,
  attendance,
  setActiveTab,
  onOpenAddEmp,
  onOpenAddDept,
  onOpenAddAtt
}) => {
  const totalEmp = employees.length;
  const totalDept = departments.length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.Attendance_Date === todayStr || a.Attendance_Date === '2026-08-06');
  const presentCount = todayAttendance.filter(a => a.Status === 'Present' || a.Status === 'Late').length;
  const attendanceRate = totalEmp > 0 ? Math.round((presentCount / totalEmp) * 100) : 0;

  const totalPayroll = employees.reduce((acc, curr) => acc + Number(curr.Salary), 0);

  // Department distribution data
  const deptData = departments.map(d => {
    const count = employees.filter(e => e.Department_ID === d.Department_ID).length;
    return {
      name: d.Department_Name,
      count: count,
      manager: d.Manager_Name
    };
  });

  // Attendance status distribution
  const statusCounts = {
    Present: todayAttendance.filter(a => a.Status === 'Present').length,
    Late: todayAttendance.filter(a => a.Status === 'Late').length,
    Absent: todayAttendance.filter(a => a.Status === 'Absent').length,
    'Half Day': todayAttendance.filter(a => a.Status === 'Half Day').length
  };

  const pieData = [
    { name: 'Present', value: statusCounts.Present, color: '#10B981' },
    { name: 'Late', value: statusCounts.Late, color: '#F59E0B' },
    { name: 'Absent', value: statusCounts.Absent, color: '#EF4444' },
    { name: 'Half Day', value: statusCounts['Half Day'], color: '#06B6D4' },
  ].filter(d => d.value > 0);

  const BAR_COLORS = ['#EC4899', '#F43F5E', '#D946EF', '#A855F7', '#FB7185'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 me-1" /> Present
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock3 className="w-3 h-3 me-1" /> Late
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 me-1" /> Absent
          </span>
        );
      case 'Half Day':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-200">
            <AlertCircle className="w-3 h-3 me-1" /> Half Day
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-900 via-rose-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-pink-900/50">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none text-pink-300">
          <Building2 className="w-72 h-72" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs px-3 py-1 rounded-full font-medium mb-3">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
              <span>Production-Ready Relational Database Connected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Executive Dashboard Overview</h1>
            <p className="text-pink-100/80 text-sm mt-1 max-w-2xl">
              Monitor real-time headcount, department structures, payroll commitments, and daily check-ins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAddEmp}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold shadow-lg shadow-pink-600/30 transition-all hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
            <button
              onClick={onOpenAddDept}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-pink-950/80 hover:bg-pink-900 text-white text-sm font-semibold border border-pink-800/80 transition-all"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Add Dept</span>
            </button>
            <button
              onClick={onOpenAddAtt}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-600/20 transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>Log Attendance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees */}
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Employees</span>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{totalEmp}</span>
            <button 
              onClick={() => setActiveTab('employees')}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center"
            >
              View Directory <ArrowUpRight className="w-3.5 h-3.5 ms-0.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Active records in <code className="text-pink-600 font-mono">employees</code> table</p>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Departments</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{totalDept}</span>
            <button 
              onClick={() => setActiveTab('departments')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center"
            >
              Manage <ArrowUpRight className="w-3.5 h-3.5 ms-0.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Active units in <code className="text-rose-600 font-mono">departments</code> table</p>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Today Present</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-slate-900">{presentCount}</span>
              <span className="text-xs text-slate-500 ms-2">({attendanceRate}%)</span>
            </div>
            <button 
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              Logs <ArrowUpRight className="w-3.5 h-3.5 ms-0.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Logged in <code className="text-emerald-600 font-mono">attendance</code> today</p>
        </div>

        {/* Monthly Payroll */}
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Payroll</span>
            <div className="w-10 h-10 rounded-xl bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900">
              ৳{totalPayroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <button 
              onClick={() => setActiveTab('reports')}
              className="text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700 flex items-center"
            >
              Payroll <ArrowUpRight className="w-3.5 h-3.5 ms-0.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2"><code className="text-fuchsia-600 font-mono">SUM(Salary)</code> across staff</p>
        </div>
      </div>

      {/* Analytics Charts & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Headcount Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Department Headcount Allocation</h2>
              <p className="text-xs text-slate-500">Number of employees per department</p>
            </div>
            <span className="text-xs font-medium text-pink-600 font-mono bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">FK Join</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#831843', borderRadius: '12px', color: '#fff', border: 'none' }}
                  itemStyle={{ color: '#FBCFE8' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {deptData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Status Pie Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today's Attendance Breakdown</h2>
              <p className="text-xs text-slate-500">Status ratio for current shift</p>
            </div>
            <span className="text-xs font-medium text-pink-600 font-mono bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">{todayStr}</span>
          </div>
          
          <div className="h-48 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#831843', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-slate-400 text-sm py-8">No attendance logged for today yet.</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-pink-100">
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 font-medium">Present: {statusCounts.Present}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 font-medium">Late: {statusCounts.Late}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-slate-600 font-medium">Absent: {statusCounts.Absent}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              <span className="text-slate-600 font-medium">Half Day: {statusCounts['Half Day']}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attendance Logs Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-pink-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Attendance Logs</h2>
            <p className="text-xs text-slate-500">Latest check-in activity JOINed with employee & department info</p>
          </div>
          <button
            onClick={() => setActiveTab('attendance')}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 hover:underline"
          >
            View All Logs &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-rose-50/50 text-[11px] font-bold text-pink-900/80 uppercase tracking-wider border-b border-pink-100">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-xs">
              {attendance.slice(0, 5).map((log) => (
                <tr key={log.Attendance_ID} className="hover:bg-pink-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{log.Employee_Name}</div>
                    <div className="text-[11px] text-slate-400">{log.Designation}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="inline-block bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-pink-100">
                      {log.Department_Name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{log.Attendance_Date}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-medium">{log.Check_In}</td>
                  <td className="py-3.5 px-4 font-mono text-rose-700 font-medium">{log.Check_Out}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(log.Status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Hub Prompt Banner */}
      <div className="bg-slate-900 border border-pink-950 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/30">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Need the XAMPP / phpMyAdmin Source Code?</h3>
            <p className="text-xs text-pink-200/80 mt-0.5">
              Access complete <code className="text-pink-300">schema.sql</code>, PDO <code className="text-pink-300">db.php</code>, and PHP files for deployment.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('codehub')}
          className="whitespace-nowrap px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-pink-600/30 transition-all"
        >
          Open Code Hub
        </button>
      </div>
    </div>
  );
};
