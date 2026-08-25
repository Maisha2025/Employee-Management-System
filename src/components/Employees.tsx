import React, { useState } from 'react';
import { Department, Employee, EmployeeWithDepartment } from '../types';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Pencil, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Building2, 
  DollarSign, 
  UserCheck,
  Eye,
  MapPin,
  X
} from 'lucide-react';
import { EmployeeModal } from './EmployeeModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface EmployeesProps {
  employees: EmployeeWithDepartment[];
  departments: Department[];
  onAddEmployee: (emp: Partial<Employee>) => void;
  onUpdateEmployee: (emp: Partial<Employee>) => void;
  onDeleteEmployee: (empId: number) => void;
}

export const Employees: React.FC<EmployeesProps> = ({
  employees,
  departments,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee
}) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<number | 'all'>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
  const [viewingEmp, setViewingEmp] = useState<EmployeeWithDepartment | null>(null);
  const [deletingEmp, setDeletingEmp] = useState<EmployeeWithDepartment | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.Name.toLowerCase().includes(search.toLowerCase()) ||
      emp.Email.toLowerCase().includes(search.toLowerCase()) ||
      emp.Designation.toLowerCase().includes(search.toLowerCase()) ||
      emp.Phone.includes(search);

    const matchesDept = deptFilter === 'all' || emp.Department_ID === Number(deptFilter);
    const matchesGender = genderFilter === 'all' || emp.Gender === genderFilter;

    return matchesSearch && matchesDept && matchesGender;
  });

  const handleOpenAdd = () => {
    setEditingEmp(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp: EmployeeWithDepartment) => {
    setEditingEmp(emp);
    setIsModalOpen(true);
  };

  const handleSave = (empData: Partial<Employee>) => {
    if (editingEmp) {
      onUpdateEmployee(empData);
      setAlert(`Employee "${empData.Name}" updated successfully.`);
    } else {
      onAddEmployee(empData);
      setAlert(`New employee "${empData.Name}" registered successfully.`);
    }
    setTimeout(() => setAlert(null), 4000);
  };

  const handleDeleteRequest = (emp: EmployeeWithDepartment) => {
    setDeletingEmp(emp);
  };

  const handleConfirmDelete = () => {
    if (!deletingEmp) return;
    onDeleteEmployee(deletingEmp.Employee_ID);
    setAlert(`Employee "${deletingEmp.Name}" removed.`);
    setDeletingEmp(null);
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {alert && (
        <div className="p-4 rounded-xl text-sm bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <span>{alert}</span>
          </div>
          <button onClick={() => setAlert(null)} className="text-xs underline font-semibold">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-pink-600" />
            Employee Directory
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Full-featured workforce management with database JOIN views and relational department linkage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-pink-600/30 transition-all hover:scale-[1.02]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or designation..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="md:col-span-4 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.Department_ID} value={d.Department_ID}>
                {d.Department_Name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-pink-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-pink-900">{filteredEmployees.length}</strong> of {employees.length} employees
          </span>
          <span className="text-[11px] text-pink-700/80 font-mono bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
            SELECT * FROM employees JOIN departments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-rose-50/50 text-[11px] font-bold text-pink-900/80 uppercase tracking-wider border-b border-pink-100">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name & Designation</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Salary</th>
                <th className="py-3 px-4">Join Date</th>
                <th className="py-3 px-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-xs">
              {filteredEmployees.map((emp) => (
                <tr key={emp.Employee_ID} className="hover:bg-pink-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-pink-600">
                    #{emp.Employee_ID}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{emp.Name}</div>
                    <div className="text-slate-500 text-[11px]">{emp.Designation}</div>
                  </td>
                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="flex items-center text-slate-600">
                      <Mail className="w-3 h-3 me-1 text-pink-400" /> {emp.Email}
                    </div>
                    <div className="flex items-center text-slate-500 text-[11px]">
                      <Phone className="w-3 h-3 me-1 text-pink-400" /> {emp.Phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
                      <Building2 className="w-3 h-3 me-1 text-pink-500" />
                      {emp.Department_Name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 font-mono">
                    ৳{Number(emp.Salary).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 me-1 text-slate-400" />
                      {emp.Join_Date}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-end space-x-1">
                    <button
                      onClick={() => setViewingEmp(emp)}
                      className="p-1.5 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                      title="View Profile Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(emp)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Edit Employee"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(emp)}
                      className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-100/50 rounded-lg transition-colors"
                      title="Delete Employee"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No employees found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-pink-100 overflow-hidden">
            <div className="bg-slate-900 text-white p-6 flex items-start justify-between border-b border-pink-950">
              <div>
                <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">Employee Profile #{viewingEmp.Employee_ID}</span>
                <h3 className="text-xl font-bold mt-1">{viewingEmp.Name}</h3>
                <p className="text-xs text-pink-200/80">{viewingEmp.Designation}</p>
              </div>
              <button onClick={() => setViewingEmp(null)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-pink-50/40 p-4 rounded-xl border border-pink-100">
                <div>
                  <span className="text-slate-400 block font-medium">Department</span>
                  <span className="font-bold text-slate-800 text-sm">{viewingEmp.Department_Name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Department Manager</span>
                  <span className="font-bold text-slate-800 text-sm">{viewingEmp.Manager_Name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Monthly Salary</span>
                  <span className="font-bold text-emerald-600 text-sm font-mono">৳{Number(viewingEmp.Salary).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Joining Date</span>
                  <span className="font-semibold text-slate-800 text-sm">{viewingEmp.Join_Date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-slate-700">
                  <Mail className="w-4 h-4 me-2 text-pink-500" />
                  <span className="font-medium">{viewingEmp.Email}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Phone className="w-4 h-4 me-2 text-pink-500" />
                  <span className="font-medium">{viewingEmp.Phone}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <MapPin className="w-4 h-4 me-2 text-pink-500" />
                  <span>{viewingEmp.Address}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Calendar className="w-4 h-4 me-2 text-pink-500" />
                  <span>Date of Birth: {viewingEmp.DOB} ({viewingEmp.Gender})</span>
                </div>
              </div>
            </div>

            <div className="bg-pink-50/40 p-4 border-t border-pink-100 flex justify-end">
              <button
                onClick={() => setViewingEmp(null)}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-pink-600/20"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingEmp}
        departments={departments}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deletingEmp !== null}
        title="Delete Employee Record"
        message={`Are you sure you want to delete employee "${deletingEmp?.Name}" (#${deletingEmp?.Employee_ID})?`}
        warningNote="MySQL CASCADE / FOREIGN KEY constraint will also remove attendance logs associated with this employee."
        confirmText="Delete Employee"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingEmp(null)}
      />
    </div>
  );
};
