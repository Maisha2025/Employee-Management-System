import React, { useState, useEffect } from 'react';
import { Employee, Department } from '../types';
import { UserPlus, X, Save } from 'lucide-react';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Partial<Employee>) => void;
  initialData?: Employee | null;
  departments: Department[];
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  departments
}) => {
  const [formData, setFormData] = useState({
    Name: '',
    Gender: 'Male' as 'Male' | 'Female' | 'Other',
    DOB: '',
    Phone: '',
    Email: '',
    Address: '',
    Department_ID: departments[0]?.Department_ID || 1,
    Designation: '',
    Salary: 60000,
    Join_Date: new Date().toISOString().split('T')[0]
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name,
        Gender: initialData.Gender,
        DOB: initialData.DOB,
        Phone: initialData.Phone,
        Email: initialData.Email,
        Address: initialData.Address,
        Department_ID: initialData.Department_ID,
        Designation: initialData.Designation,
        Salary: initialData.Salary,
        Join_Date: initialData.Join_Date
      });
    } else {
      setFormData({
        Name: '',
        Gender: 'Male',
        DOB: '1995-01-01',
        Phone: '',
        Email: '',
        Address: '',
        Department_ID: departments[0]?.Department_ID || 1,
        Designation: '',
        Salary: 65000,
        Join_Date: new Date().toISOString().split('T')[0]
      });
    }
    setError('');
  }, [initialData, isOpen, departments]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Department_ID' || name === 'Salary' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name.trim() || !formData.Email.trim() || !formData.Department_ID) {
      setError('Name, Email, and Department selection are required.');
      return;
    }

    onSave({
      Employee_ID: initialData?.Employee_ID,
      ...formData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-pink-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600/30 text-pink-400 border border-pink-500/30 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">
              {initialData ? 'Edit Employee Record' : 'Register New Employee'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="e.g. তানিম রহমান (Tanim Rahman)"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="e.g. tanim.rahman@company.bd"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Gender *
              </label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Department Dynamic Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Department (Foreign Key) *
              </label>
              <select
                name="Department_ID"
                value={formData.Department_ID}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none font-medium text-pink-950 bg-pink-50/50"
              >
                {departments.map((dept) => (
                  <option key={dept.Department_ID} value={dept.Department_ID}>
                    {dept.Department_Name} (Manager: {dept.Manager_Name})
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Designation *
              </label>
              <input
                type="text"
                required
                name="Designation"
                value={formData.Designation}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Monthly Salary (৳) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                name="Salary"
                value={formData.Salary}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none font-mono"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Joining Date *
              </label>
              <input
                type="date"
                required
                name="Join_Date"
                value={formData.Join_Date}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Residential Address
              </label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="123 Innovation Way, Tech Park, City, State"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
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
              <span>{initialData ? 'Update Record' : 'Register Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
