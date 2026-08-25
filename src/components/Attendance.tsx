import React, { useState } from 'react';
import { Attendance as AttendanceRecord, AttendanceWithEmployee, EmployeeWithDepartment } from '../types';
import { 
  CalendarCheck, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Pencil, 
  Trash2, 
  CheckCircle2, 
  Clock3, 
  XCircle, 
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { AttendanceModal } from './AttendanceModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AttendanceProps {
  attendance: AttendanceWithEmployee[];
  employees: EmployeeWithDepartment[];
  onAddAttendance: (att: Partial<AttendanceRecord>) => void;
  onUpdateAttendance: (att: Partial<AttendanceRecord>) => void;
  onDeleteAttendance: (attId: number) => void;
}

export const Attendance: React.FC<AttendanceProps> = ({
  attendance,
  employees,
  onAddAttendance,
  onUpdateAttendance,
  onDeleteAttendance
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAtt, setEditingAtt] = useState<AttendanceRecord | null>(null);
  const [deletingAtt, setDeletingAtt] = useState<AttendanceWithEmployee | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const filteredLogs = attendance.filter((log) => {
    const matchesSearch =
      log.Employee_Name.toLowerCase().includes(search.toLowerCase()) ||
      log.Department_Name.toLowerCase().includes(search.toLowerCase());

    const matchesDate = !selectedDate || log.Attendance_Date === selectedDate;
    const matchesStatus = selectedStatus === 'all' || log.Status === selectedStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingAtt(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (log: AttendanceWithEmployee) => {
    setEditingAtt(log);
    setIsModalOpen(true);
  };

  const handleSave = (attData: Partial<AttendanceRecord>) => {
    if (editingAtt) {
      onUpdateAttendance(attData);
      setAlert('Attendance record updated successfully.');
    } else {
      onAddAttendance(attData);
      setAlert('Attendance logged successfully.');
    }
    setTimeout(() => setAlert(null), 4000);
  };

  const handleDeleteRequest = (log: AttendanceWithEmployee) => {
    setDeletingAtt(log);
  };

  const handleConfirmDelete = () => {
    if (!deletingAtt) return;
    onDeleteAttendance(deletingAtt.Attendance_ID);
    setAlert('Attendance log removed successfully.');
    setDeletingAtt(null);
    setTimeout(() => setAlert(null), 4000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 me-1 text-emerald-600" /> Present
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock3 className="w-3.5 h-3.5 me-1 text-amber-600" /> Late
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 me-1 text-rose-600" /> Absent
          </span>
        );
      case 'Half Day':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-200">
            <AlertCircle className="w-3.5 h-3.5 me-1 text-pink-600" /> Half Day
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {alert && (
        <div className="p-4 rounded-xl text-sm bg-pink-50 text-pink-900 border border-pink-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-pink-600" />
            <span>{alert}</span>
          </div>
          <button onClick={() => setAlert(null)} className="text-xs underline font-semibold">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-7 h-7 text-pink-600" />
            Attendance Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Log employee check-in and check-out timestamps with status indicators and search filters.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-pink-600/30 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Log Attendance</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee or department..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="md:col-span-4 flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className="text-xs text-pink-600 hover:text-pink-700 underline whitespace-nowrap font-medium"
            >
              Clear Date
            </button>
          )}
        </div>

        <div className="md:col-span-4 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
            <option value="Half Day">Half Day</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-pink-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-pink-900">{filteredLogs.length}</strong> attendance entries
          </span>
          <span className="text-[11px] font-mono text-pink-700/80 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
            UNIQUE KEY (Employee_ID, Attendance_Date)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-rose-50/50 text-[11px] font-bold text-pink-900/80 uppercase tracking-wider border-b border-pink-100">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.Attendance_ID} className="hover:bg-pink-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-pink-700">
                    {log.Attendance_Date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.Employee_Name}</div>
                    <div className="text-[11px] text-slate-500">{log.Designation}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-pink-100">
                      {log.Department_Name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-medium">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 me-1 text-emerald-500" />
                      {log.Check_In}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-rose-700 font-medium">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 me-1 text-rose-500" />
                      {log.Check_Out}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(log.Status)}
                  </td>
                  <td className="py-3.5 px-4 text-end space-x-1">
                    <button
                      onClick={() => handleOpenEdit(log)}
                      className="p-1.5 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                      title="Edit Log"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(log)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No attendance logs found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingAtt}
        employees={employees}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deletingAtt !== null}
        title="Delete Attendance Log"
        message={`Are you sure you want to delete attendance record for ${deletingAtt?.Employee_Name} on ${deletingAtt?.Attendance_Date}?`}
        warningNote="This will execute a MySQL DELETE FROM attendance statement."
        confirmText="Delete Record"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingAtt(null)}
      />
    </div>
  );
};
