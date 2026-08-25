import React, { useState } from 'react';
import { phpCodeFiles } from '../data/phpCodeTemplates';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Database, 
  Terminal, 
  FolderTree, 
  BookOpen,
  Sparkles
} from 'lucide-react';

export const PhpCodeHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>(phpCodeFiles[0].filename);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFileObj = phpCodeFiles.find(f => f.filename === selectedFile) || phpCodeFiles[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileObj.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([currentFileObj.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFileObj.filename.split('/').pop() || currentFileObj.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    phpCodeFiles.forEach((f) => {
      const blob = new Blob([f.code], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = f.filename.replace('/', '_');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-3 py-1 rounded-full font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>PHP 8.2 + PDO MySQL + Bootstrap 5 Code Base</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">PHP & MySQL Code Architecture Hub</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Production-ready backend procedural/OOP code structured with prepared statements, error handling, and Foreign Keys for XAMPP / phpMyAdmin.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadAll}
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All Code Files</span>
          </button>
        </div>
      </div>

      {/* Directory Structure & Setup Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Directory Structure Tree */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <FolderTree className="w-4 h-4 text-blue-600" />
            <span>Recommended XAMPP Directory Structure</span>
          </div>

          <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`ems/
├── schema.sql           # MySQL Table Creation & Dummy Data
├── db.php               # PDO Database Connection
├── includes/
│   ├── header.php       # Bootstrap 5 Navigation Header
│   └── footer.php       # Common Layout Footer
├── index.php            # Dashboard Overview
├── departments.php      # Department Management CRUD
├── employees.php        # Employee Directory & CRUD
├── attendance.php       # Daily Attendance Tracker
└── reports.php          # Payroll & Analytics Reports`}
          </pre>

          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center">
              <BookOpen className="w-3.5 h-3.5 me-1.5 text-blue-600" /> Setup Instructions for XAMPP
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 ms-1">
              <li>Start Apache and MySQL in <strong>XAMPP Control Panel</strong>.</li>
              <li>Open <strong>phpMyAdmin</strong> (<code className="font-mono bg-blue-100/70 px-1 rounded">http://localhost/phpmyadmin</code>).</li>
              <li>Import <code className="font-mono font-bold text-slate-800">schema.sql</code> or run its code in the SQL tab.</li>
              <li>Place the <code className="font-mono bg-blue-100/70 px-1 rounded">ems/</code> folder inside <code className="font-mono font-bold text-slate-800">C:/xampp/htdocs/ems/</code>.</li>
              <li>Visit <code className="font-mono bg-blue-100/70 px-1 rounded">http://localhost/ems/</code> in browser.</li>
            </ol>
          </div>
        </div>

        {/* Code File Explorer & Inspector */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          {/* File Selector Tabs */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
              {phpCodeFiles.map((file) => {
                const isActive = file.filename === selectedFile;
                return (
                  <button
                    key={file.filename}
                    onClick={() => setSelectedFile(file.filename)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{file.filename}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-blue-400 font-bold">{currentFileObj.filename}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {currentFileObj.category}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <button
                onClick={handleDownloadSingle}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="px-5 py-2.5 bg-slate-950/50 text-xs text-slate-400 border-b border-slate-800/60 font-sans">
            {currentFileObj.description}
          </div>

          {/* Code Viewer */}
          <div className="p-5 flex-1 overflow-y-auto max-h-[500px]">
            <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {currentFileObj.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
