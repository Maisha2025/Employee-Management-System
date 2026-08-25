import React, { useState, useEffect } from 'react';
import { Attendance, EmployeeWithDepartment } from '../types';
import { CalendarCheck, X, Save } from 'lucide-react';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (attendance: Partial<Attendance>) => void;
  initialData?: Attendance | null;
  employees: EmployeeWithDepartment[];
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  employees
}) => {
  const [formData, setFormData] = useState({
    Employee_ID: employees[0]?.Employee_ID || 101,
    Attendance_Date: new Date().toISOString().split('T')[0],
    Check_In: '09:00:00',
    Check_Out: '17:00:00',
    Status: 'Present' as 'Present' | 'Absent' | 'Late' | 'Half Day'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        Employee_ID: initialData.Employee_ID,
        Attendance_Date: initialData.Attendance_Date,
        Check_In: initialData.Check_In,
        Check_Out: initialData.Check_Out,
        Status: initialData.Status
      });
    } else {
      setFormData({
        Employee_ID: employees[0]?.Employee_ID || 101,
        Attendance_Date: new Date().toISOString().split('T')[0],
        Check_In: '09:00:00',
        Check_Out: '17:00:00',
        Status: 'Present'
      });
    }
    setError('');
  }, [initialData, isOpen, employees]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Employee_ID' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Employee_ID || !formData.Attendance_Date) {
      setError('Employee selection and Attendance Date are required.');
      return;
    }

    onSave({
      Attendance_ID: initialData?.Attendance_ID,
      ...formData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-pink-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600/30 text-pink-400 border border-pink-500/30 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">
              {initialData ? 'Edit Attendance Log' : 'Record Daily Attendance'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Employee */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Employee (Foreign Key) *
            </label>
            <select
              name="Employee_ID"
              value={formData.Employee_ID}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none font-medium bg-pink-50/40 text-slate-900"
            >
              {employees.map((emp) => (
                <option key={emp.Employee_ID} value={emp.Employee_ID}>
                  #{emp.Employee_ID} - {emp.Name} ({emp.Department_Name})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Attendance Date *
            </label>
            <input
              type="date"
              required
              name="Attendance_Date"
              value={formData.Attendance_Date}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          {/* Check In / Out */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Check In Time
              </label>
              <input
                type="time"
                step="1"
                name="Check_In"
                value={formData.Check_In}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 text-sm font-mono focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Check Out Time
              </label>
              <input
                type="time"
                step="1"
                name="Check_Out"
                value={formData.Check_Out}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 text-sm font-mono focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Attendance Status *
            </label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none font-semibold text-slate-800"
            >
              <option value="Present">Present (Full Shift)</option>
              <option value="Late">Late Arrival</option>
              <option value="Absent">Absent</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>

          <div className="pt-4 border-t border-pink-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-pink-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-pink-600/30 transition-all hover:scale-[1.02]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{initialData ? 'Update Record' : 'Save Attendance'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
