import React, { useState } from 'react';
import { Department, Employee } from '../types';
import { 
  Building2, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Users, 
  UserCheck, 
  ShieldAlert,
  Info
} from 'lucide-react';
import { DepartmentModal } from './DepartmentModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface DepartmentsProps {
  departments: Department[];
  employees: Employee[];
  onAddDepartment: (dept: Partial<Department>) => void;
  onUpdateDepartment: (dept: Partial<Department>) => void;
  onDeleteDepartment: (deptId: number) => { success: boolean; message?: string };
}

export const Departments: React.FC<DepartmentsProps> = ({
  departments,
  employees,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment
}) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deletingDept, setDeletingDept] = useState<Department | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filteredDepts = departments.filter(d => 
    d.Department_Name.toLowerCase().includes(search.toLowerCase()) ||
    d.Manager_Name.toLowerCase().includes(search.toLowerCase())
  );

  const getMemberCount = (deptId: number) => {
    return employees.filter(e => e.Department_ID === deptId).length;
  };

  const handleOpenAdd = () => {
    setEditingDept(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    setIsModalOpen(true);
  };

  const handleSave = (deptData: Partial<Department>) => {
    if (editingDept) {
      onUpdateDepartment(deptData);
      setAlert({ type: 'success', message: `Department "${deptData.Department_Name}" updated successfully.` });
    } else {
      onAddDepartment(deptData);
      setAlert({ type: 'success', message: `Department "${deptData.Department_Name}" created successfully.` });
    }
  };

  const handleDeleteRequest = (dept: Department) => {
    const memberCount = getMemberCount(dept.Department_ID);
    if (memberCount > 0) {
      setAlert({
        type: 'error',
        message: `Cannot delete "${dept.Department_Name}": Foreign Key Restriction (There are ${memberCount} employees assigned to this department). Please reassign or delete them first.`
      });
      return;
    }
    setDeletingDept(dept);
  };

  const handleConfirmDelete = () => {
    if (!deletingDept) return;
    const res = onDeleteDepartment(deletingDept.Department_ID);
    if (res.success) {
      setAlert({ type: 'success', message: `Department "${deletingDept.Department_Name}" deleted successfully.` });
    } else {
      setAlert({ type: 'error', message: res.message || 'Failed to delete department.' });
    }
    setDeletingDept(null);
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {alert && (
        <div
          className={`p-4 rounded-xl text-sm flex items-start justify-between border ${
            alert.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {alert.type === 'success' ? (
              <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{alert.message}</span>
          </div>
          <button
            onClick={() => setAlert(null)}
            className="text-xs font-semibold underline ms-4 hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-pink-600" />
            Department Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Organize business units, designate managers, and monitor staffing allocations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-pink-600/30 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by department name or manager..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-pink-200 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
          />
        </div>
        <div className="text-xs text-slate-500 hidden sm:block">
          Total Departments: <span className="font-bold text-pink-900">{departments.length}</span>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDepts.map((dept) => {
          const count = getMemberCount(dept.Department_ID);
          return (
            <div
              key={dept.Department_ID}
              className="bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-base border border-pink-100 shrink-0">
                    #{dept.Department_ID}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(dept)}
                      className="p-1.5 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                      title="Edit Department"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(dept)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Department"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-slate-900">{dept.Department_Name}</h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center">
                  <UserCheck className="w-3.5 h-3.5 me-1 text-slate-400" />
                  Manager: <span className="font-semibold text-slate-700 ms-1">{dept.Manager_Name}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
                  <Users className="w-3 h-3 me-1.5 text-pink-500" />
                  {count} {count === 1 ? 'Employee' : 'Employees'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  dept_id={dept.Department_ID}
                </span>
              </div>
            </div>
          );
        })}

        {filteredDepts.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-8 border border-pink-100 text-center text-slate-500">
            No departments found matching your search term.
          </div>
        )}
      </div>

      {/* Relational Integrity Info Box */}
      <div className="bg-rose-50/50 border border-pink-100 rounded-2xl p-4 text-xs text-slate-600 flex items-start space-x-3">
        <Info className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Relational Safeguard (Foreign Key Rules):</span>
          <p className="mt-0.5">
            Deleting a department enforces <code className="bg-pink-100/70 px-1 py-0.5 rounded text-pink-900">ON DELETE RESTRICT</code> in SQL.
            If employees are currently assigned to a department, MySQL prevents accidental deletion to protect database integrity.
          </p>
        </div>
      </div>

      {/* Department Modal */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingDept}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deletingDept !== null}
        title="Delete Department"
        message={`Are you sure you want to delete department "${deletingDept?.Department_Name}" (#${deletingDept?.Department_ID})?`}
        warningNote="This action executes a MySQL DELETE query. Ensure no employees are assigned to this department."
        confirmText="Delete Department"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingDept(null)}
      />
    </div>
  );
};
