import { PhpCodeFile } from '../types';

export const phpCodeFiles: PhpCodeFile[] = [
  {
    filename: 'schema.sql',
    category: 'database',
    description: 'MySQL database setup script with table creation, Foreign Keys, ON DELETE/UPDATE rules, and sample dummy data.',
    code: `-- ============================================================
-- EMPLOYEE MANAGEMENT SYSTEM (EMS) - DATABASE SCHEMA
-- Target DBMS: MySQL / MariaDB (XAMPP / phpMyAdmin)
-- ============================================================

CREATE DATABASE IF NOT EXISTS \`ems_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`ems_db\`;

-- ------------------------------------------------------------
-- 1. Table: departments
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`attendance\`;
DROP TABLE IF EXISTS \`employees\`;
DROP TABLE IF EXISTS \`departments\`;

CREATE TABLE \`departments\` (
  \`Department_ID\` INT AUTO_INCREMENT PRIMARY KEY,
  \`Department_Name\` VARCHAR(100) NOT NULL,
  \`Manager_Name\` VARCHAR(100) NOT NULL,
  CONSTRAINT \`uk_department_name\` UNIQUE (\`Department_Name\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Table: employees
-- ------------------------------------------------------------
CREATE TABLE \`employees\` (
  \`Employee_ID\` INT AUTO_INCREMENT PRIMARY KEY,
  \`Name\` VARCHAR(100) NOT NULL,
  \`Gender\` VARCHAR(10) NOT NULL CHECK (\`Gender\` IN ('Male', 'Female', 'Other')),
  \`DOB\` DATE NOT NULL,
  \`Phone\` VARCHAR(20) NOT NULL,
  \`Email\` VARCHAR(100) NOT NULL,
  \`Address\` VARCHAR(255) NOT NULL,
  \`Department_ID\` INT NOT NULL,
  \`Designation\` VARCHAR(100) NOT NULL,
  \`Salary\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`Join_Date\` DATE NOT NULL,
  CONSTRAINT \`uk_employee_email\` UNIQUE (\`Email\`),
  CONSTRAINT \`fk_employees_department\` FOREIGN KEY (\`Department_ID\`)
    REFERENCES \`departments\` (\`Department_ID\`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Table: attendance
-- ------------------------------------------------------------
CREATE TABLE \`attendance\` (
  \`Attendance_ID\` INT AUTO_INCREMENT PRIMARY KEY,
  \`Employee_ID\` INT NOT NULL,
  \`Attendance_Date\` DATE NOT NULL,
  \`Check_In\` TIME NULL,
  \`Check_Out\` TIME NULL,
  \`Status\` VARCHAR(20) NOT NULL DEFAULT 'Present',
  CONSTRAINT \`uk_emp_date\` UNIQUE (\`Employee_ID\`, \`Attendance_Date\`),
  CONSTRAINT \`fk_attendance_employee\` FOREIGN KEY (\`Employee_ID\`)
    REFERENCES \`employees\` (\`Employee_ID\`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. Table: admin_users (For Admin Portal Authentication)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`admin_users\` (
  \`user_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`role\` VARCHAR(20) NOT NULL DEFAULT 'admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DUMMY DATA FOR TESTING
-- ============================================================

INSERT INTO \`departments\` (\`Department_ID\`, \`Department_Name\`, \`Manager_Name\`) VALUES
(1, 'Human Resources', 'শ্রাবন্তী সেন (Srabanti Sen)'),
(2, 'Engineering', 'তানভীর আহমেদ (Tanvir Ahmed)'),
(3, 'Finance', 'আরিফ হোসেন (Arif Hossain)'),
(4, 'Marketing', 'অনন্যা মুখার্জী (Ananya Mukherjee)'),
(5, 'Operations', 'সৌম্য সমাদ্দার (Soumya Samaddar)');

INSERT INTO \`employees\` (\`Employee_ID\`, \`Name\`, \`Gender\`, \`DOB\`, \`Phone\`, \`Email\`, \`Address\`, \`Department_ID\`, \`Designation\`, \`Salary\`, \`Join_Date\`) VALUES
(101, 'তানিম রহমান (Tanim Rahman)', 'Male', '1990-05-14', '+880 1711-234567', 'tanim.rahman@company.bd', '১২৪ আইটি পার্ক, গুলশান, ঢাকা', 2, 'Senior Lead Software Engineer', 95000.00, '2021-03-15'),
(102, 'নুসরাত জাহান (Nusrat Jahan)', 'Female', '1993-08-22', '+880 1812-876543', 'nusrat.jahan@company.bd', '৪৫৬ গ্র্যান্ড এভিনিউ, ধানমন্ডি, ঢাকা', 1, 'HR Operations Manager', 72000.00, '2022-01-10'),
(103, 'অর্ঘ্য চৌধুরী (Arghya Chowdhury)', 'Male', '1988-11-30', '+880 1913-345678', 'arghya.chowdhury@company.bd', '৭৮৯ মতিঝিল বা/এ, ঢাকা', 3, 'Senior Financial Analyst', 84000.00, '2020-07-01'),
(104, 'অনন্যা মুখার্জী (Ananya Mukherjee)', 'Female', '1995-02-18', '+880 1614-901234', 'ananya.mukherjee@company.bd', '৩২১ ক্রিয়েটিভ লেন, বনানী, ঢাকা', 4, 'Digital Marketing Strategist', 68000.00, '2023-04-18'),
(105, 'মেহেদী হাসান (Mehedi Hasan)', 'Male', '1992-09-05', '+880 1515-456789', 'mehedi.hasan@company.bd', '৫৫৫ টেক হাব, উত্তরা, ঢাকা', 2, 'Full Stack Developer', 82000.00, '2022-09-01'),
(106, 'সাদিয়া ইসলাম (Sadia Islam)', 'Female', '1991-12-12', '+880 1316-678901', 'sadia.islam@company.bd', '৮৮৮ সিডিএ আবাসিক এলাকা, চট্টগ্রাম', 5, 'Operations Coordinator', 61000.00, '2021-11-15');

INSERT INTO \`attendance\` (\`Attendance_ID\`, \`Employee_ID\`, \`Attendance_Date\`, \`Check_In\`, \`Check_Out\`, \`Status\`) VALUES
(1, 101, CURDATE(), '08:55:00', '17:05:00', 'Present'),
(2, 102, CURDATE(), '09:02:00', '17:00:00', 'Present'),
(3, 103, CURDATE(), '09:25:00', '17:30:00', 'Late'),
(4, 104, CURDATE(), '08:45:00', '17:15:00', 'Present'),
(5, 105, CURDATE(), '00:00:00', '00:00:00', 'Absent'),
(6, 106, CURDATE(), '09:00:00', '13:00:00', 'Half Day');
`
  },
  {
    filename: 'db.php',
    category: 'database',
    description: 'PDO MySQL Database connection file with robust error handling and UTF-8 charset.',
    code: `<?php
/**
 * Database Connection Configuration (PDO)
 * Employee Management System
 */

$host = 'localhost';
$db   = 'ems_db';
$user = 'root';
$pass = ''; // Default XAMPP MySQL password is empty
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Database Connection Error: " . $e->getMessage());
}
?>`
  },
  {
    filename: 'includes/header.php',
    category: 'includes',
    description: 'Reusable header layout with Bootstrap 5 CDN and responsive navigation bar.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management System</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .navbar-brand { font-weight: 700; letter-spacing: 0.5px; }
        .card { border-radius: 12px; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .table-hover tbody tr:hover { background-color: rgba(13, 110, 253, 0.03); }
        .badge-present { background-color: #198754; }
        .badge-late { background-color: #fd7e14; }
        .badge-absent { background-color: #dc3545; }
        .badge-halfday { background-color: #0dcaf0; }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-4 shadow-sm">
    <div class="container-fluid px-4">
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.php">
            <i class="fa-solid fa-users-gear text-primary"></i> EMS Portal
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-dark navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link <?= basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active fw-bold' : '' ?>" href="index.php">
                        <i class="fa-solid fa-gauge me-1"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= basename($_SERVER['PHP_SELF']) == 'departments.php' ? 'active fw-bold' : '' ?>" href="departments.php">
                        <i class="fa-solid fa-sitemap me-1"></i> Departments
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= basename($_SERVER['PHP_SELF']) == 'employees.php' ? 'active fw-bold' : '' ?>" href="employees.php">
                        <i class="fa-solid fa-user-tie me-1"></i> Employees
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= basename($_SERVER['PHP_SELF']) == 'attendance.php' ? 'active fw-bold' : '' ?>" href="attendance.php">
                        <i class="fa-solid fa-calendar-check me-1"></i> Attendance
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= basename($_SERVER['PHP_SELF']) == 'reports.php' ? 'active fw-bold' : '' ?>" href="reports.php">
                        <i class="fa-solid fa-chart-line me-1"></i> Reports
                    </a>
                </li>
            </ul>
            <span class="navbar-text text-light small">
                <i class="fa-solid fa-clock me-1 text-info"></i> <?= date('F j, Y') ?>
            </span>
        </div>
    </div>
</nav>
<div class="container-fluid px-4 pb-5">`
  },
  {
    filename: 'includes/footer.php',
    category: 'includes',
    description: 'Reusable footer layout with Bootstrap 5 JS bundle.',
    code: `</div> <!-- /container -->

<footer class="bg-white border-top py-3 mt-auto text-center text-muted small">
    <div class="container">
        <span>Employee Management System &copy; <?= date('Y') ?> | Production Ready PHP & MySQL</span>
    </div>
</footer>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`
  },
  {
    filename: 'index.php',
    category: 'pages',
    description: 'Dashboard page with metric cards, department stats, and recent check-ins.',
    code: `<?php
require_once 'db.php';
require_once 'includes/header.php';

// Fetch Summary Stats
$totalEmp = $pdo->query("SELECT COUNT(*) FROM employees")->fetchColumn();
$totalDept = $pdo->query("SELECT COUNT(*) FROM departments")->fetchColumn();
$todayAttendance = $pdo->query("SELECT COUNT(*) FROM attendance WHERE Attendance_Date = CURDATE() AND Status IN ('Present', 'Late')")->fetchColumn();
$monthlyPayroll = $pdo->query("SELECT SUM(Salary) FROM employees")->fetchColumn();

// Fetch Department Counts
$deptCounts = $pdo->query("
    SELECT d.Department_Name, COUNT(e.Employee_ID) AS Emp_Count 
    FROM departments d 
    LEFT JOIN employees e ON d.Department_ID = e.Department_ID 
    GROUP BY d.Department_ID
")->fetchAll();

// Fetch Recent Attendance Logs
$recentLogs = $pdo->query("
    SELECT a.*, e.Name AS Employee_Name, d.Department_Name 
    FROM attendance a 
    JOIN employees e ON a.Employee_ID = e.Employee_ID 
    JOIN departments d ON e.Department_ID = d.Department_ID 
    ORDER BY a.Attendance_Date DESC, a.Check_In DESC 
    LIMIT 6
")->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-gauge text-primary me-2"></i>Dashboard Overview</h2>
        <p class="text-muted mb-0">System metrics, department allocation, and real-time attendance status.</p>
    </div>
    <div class="d-flex gap-2">
        <a href="employees.php?action=add" class="btn btn-primary"><i class="fa-solid fa-user-plus me-1"></i> Add Employee</a>
        <a href="attendance.php?action=add" class="btn btn-outline-dark"><i class="fa-solid fa-clock-rotate-left me-1"></i> Log Attendance</a>
    </div>
</div>

<!-- Key Stat Cards -->
<div class="row g-3 mb-4">
    <div class="col-md-3">
        <div class="card p-3 border-start border-primary border-4">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-bold">Total Employees</span>
                    <h2 class="fw-bold my-1 text-primary"><?= $totalEmp ?></h2>
                </div>
                <div class="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                    <i class="fa-solid fa-users fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card p-3 border-start border-success border-4">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-bold">Departments</span>
                    <h2 class="fw-bold my-1 text-success"><?= $totalDept ?></h2>
                </div>
                <div class="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                    <i class="fa-solid fa-sitemap fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card p-3 border-start border-info border-4">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-bold">Today Present</span>
                    <h2 class="fw-bold my-1 text-info"><?= $todayAttendance ?> <small class="fs-6 text-muted">/ <?= $totalEmp ?></small></h2>
                </div>
                <div class="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                    <i class="fa-solid fa-user-check fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card p-3 border-start border-warning border-4">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-bold">Monthly Payroll</span>
                    <h2 class="fw-bold my-1 text-warning">$<?= number_format($monthlyPayroll, 2) ?></h2>
                </div>
                <div class="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                    <i class="fa-solid fa-wallet fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row g-4">
    <!-- Department Breakdown -->
    <div class="col-lg-5">
        <div class="card h-100">
            <div class="card-header bg-white fw-bold py-3">
                <i class="fa-solid fa-chart-pie text-primary me-2"></i>Department Headcount
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <?php foreach ($deptCounts as $dc): ?>
                        <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                            <span class="fw-medium"><i class="fa-solid fa-folder me-2 text-secondary"></i><?= htmlspecialchars($dc['Department_Name']) ?></span>
                            <span class="badge bg-primary rounded-pill px-3 py-2"><?= $dc['Emp_Count'] ?> Employees</span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>

    <!-- Recent Attendance Logs -->
    <div class="col-lg-7">
        <div class="card h-100">
            <div class="card-header bg-white fw-bold py-3 d-flex justify-content-between align-items-center">
                <span><i class="fa-solid fa-list-check text-success me-2"></i>Recent Attendance Logs</span>
                <a href="attendance.php" class="btn btn-sm btn-outline-secondary">View All</a>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($recentLogs as $log): ?>
                                <tr>
                                    <td>
                                        <div class="fw-bold"><?= htmlspecialchars($log['Employee_Name']) ?></div>
                                        <small class="text-muted"><?= htmlspecialchars($log['Department_Name']) ?></small>
                                    </td>
                                    <td><?= htmlspecialchars($log['Attendance_Date']) ?></td>
                                    <td><?= htmlspecialchars($log['Check_In']) ?></td>
                                    <td><?= htmlspecialchars($log['Check_Out']) ?></td>
                                    <td>
                                        <?php
                                        $badge = 'bg-secondary';
                                        if ($log['Status'] == 'Present') $badge = 'badge-present';
                                        if ($log['Status'] == 'Late') $badge = 'badge-late';
                                        if ($log['Status'] == 'Absent') $badge = 'badge-absent';
                                        if ($log['Status'] == 'Half Day') $badge = 'badge-halfday';
                                        ?>
                                        <span class="badge <?= $badge ?> px-2 py-1"><?= htmlspecialchars($log['Status']) ?></span>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>`
  },
  {
    filename: 'departments.php',
    category: 'pages',
    description: 'Complete Department Management CRUD with Foreign Key error handling.',
    code: `<?php
require_once 'db.php';

$message = '';
$error = '';

// Handle Create / Edit POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dept_id = $_POST['Department_ID'] ?? null;
    $dept_name = trim($_POST['Department_Name'] ?? '');
    $manager_name = trim($_POST['Manager_Name'] ?? '');

    if (empty($dept_name) || empty($manager_name)) {
        $error = "Please fill in all required fields.";
    } else {
        if ($dept_id) {
            // Update
            $stmt = $pdo->prepare("UPDATE departments SET Department_Name = ?, Manager_Name = ? WHERE Department_ID = ?");
            if ($stmt->execute([$dept_name, $manager_name, $dept_id])) {
                $message = "Department updated successfully.";
            }
        } else {
            // Insert
            $stmt = $pdo->prepare("INSERT INTO departments (Department_Name, Manager_Name) VALUES (?, ?)");
            try {
                $stmt->execute([$dept_name, $manager_name]);
                $message = "Department added successfully.";
            } catch (\PDOException $e) {
                if ($e->getCode() == 23000) {
                    $error = "Department Name already exists.";
                } else {
                    $error = "Error: " . $e->getMessage();
                }
            }
        }
    }
}

// Handle Delete GET
if (isset($_GET['delete'])) {
    $delete_id = (int)$_GET['delete'];
    try {
        $stmt = $pdo->prepare("DELETE FROM departments WHERE Department_ID = ?");
        $stmt->execute([$delete_id]);
        $message = "Department deleted successfully.";
    } catch (\PDOException $e) {
        $error = "Cannot delete department: Foreign Key constraint restriction (Employees assigned to this department).";
    }
}

// Fetch all Departments
$departments = $pdo->query("
    SELECT d.*, COUNT(e.Employee_ID) as Total_Employees 
    FROM departments d 
    LEFT JOIN employees e ON d.Department_ID = e.Department_ID 
    GROUP BY d.Department_ID 
    ORDER BY d.Department_ID ASC
")->fetchAll();

require_once 'includes/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-sitemap text-primary me-2"></i>Department Management</h2>
        <p class="text-muted mb-0">Create, edit, and organize organizational units.</p>
    </div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deptModal" onclick="clearDeptForm()">
        <i class="fa-solid fa-plus me-1"></i> Add Department
    </button>
</div>

<?php if ($message): ?>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="fa-solid fa-circle-check me-2"></i><?= htmlspecialchars($message) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if ($error): ?>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <i class="fa-solid fa-triangle-exclamation me-2"></i><?= htmlspecialchars($error) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="card shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">ID</th>
                        <th>Department Name</th>
                        <th>Manager Name</th>
                        <th>Employees Count</th>
                        <th class="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($departments)): ?>
                        <tr><td colspan="5" class="text-center py-4 text-muted">No departments found.</td></tr>
                    <?php else: ?>
                        <?php foreach ($departments as $dept): ?>
                            <tr>
                                <td class="ps-4 fw-bold text-secondary">#<?= $dept['Department_ID'] ?></td>
                                <td class="fw-semibold text-primary"><?= htmlspecialchars($dept['Department_Name']) ?></td>
                                <td><i class="fa-solid fa-user-tie me-2 text-muted"></i><?= htmlspecialchars($dept['Manager_Name']) ?></td>
                                <td>
                                    <span class="badge bg-info bg-opacity-10 text-info border border-info rounded-pill px-3 py-1">
                                        <?= $dept['Total_Employees'] ?> Members
                                    </span>
                                </td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-sm btn-outline-primary me-1" 
                                            onclick='editDept(<?= json_encode($dept) ?>)'>
                                        <i class="fa-solid fa-pen-to-square"></i> Edit
                                    </button>
                                    <a href="departments.php?delete=<?= $dept['Department_ID'] ?>" 
                                       class="btn btn-sm btn-outline-danger" 
                                       onclick="return confirm('Are you sure you want to delete this department?');">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Add/Edit Department Modal -->
<div class="modal fade" id="deptModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" action="departments.php">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="deptModalTitle">Add New Department</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="Department_ID" id="dept_id">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Department Name *</label>
                        <input type="text" name="Department_Name" id="dept_name" class="form-control" placeholder="e.g. Engineering" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Manager Name *</label>
                        <input type="text" name="Manager_Name" id="manager_name" class="form-control" placeholder="e.g. Jane Doe" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-save me-1"></i> Save Department</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function clearDeptForm() {
    document.getElementById('deptModalTitle').innerText = 'Add New Department';
    document.getElementById('dept_id').value = '';
    document.getElementById('dept_name').value = '';
    document.getElementById('manager_name').value = '';
}

function editDept(dept) {
    document.getElementById('deptModalTitle').innerText = 'Edit Department';
    document.getElementById('dept_id').value = dept.Department_ID;
    document.getElementById('dept_name').value = dept.Department_Name;
    document.getElementById('manager_name').value = dept.Manager_Name;
    var myModal = new bootstrap.Modal(document.getElementById('deptModal'));
    myModal.show();
}
</script>

<?php require_once 'includes/footer.php'; ?>`
  },
  {
    filename: 'employees.php',
    category: 'pages',
    description: 'Complete Employee Management CRUD with JOIN query, dynamic Department dropdown, search filter.',
    code: `<?php
require_once 'db.php';

$message = '';
$error = '';

// Handle Create / Edit POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emp_id = $_POST['Employee_ID'] ?? null;
    $name = trim($_POST['Name'] ?? '');
    $gender = $_POST['Gender'] ?? '';
    $dob = $_POST['DOB'] ?? '';
    $phone = trim($_POST['Phone'] ?? '');
    $email = trim($_POST['Email'] ?? '');
    $address = trim($_POST['Address'] ?? '');
    $department_id = $_POST['Department_ID'] ?? '';
    $designation = trim($_POST['Designation'] ?? '');
    $salary = $_POST['Salary'] ?? 0;
    $join_date = $_POST['Join_Date'] ?? '';

    if (empty($name) || empty($email) || empty($department_id)) {
        $error = "Please complete all required fields.";
    } else {
        if ($emp_id) {
            // Update
            $stmt = $pdo->prepare("
                UPDATE employees 
                SET Name=?, Gender=?, DOB=?, Phone=?, Email=?, Address=?, Department_ID=?, Designation=?, Salary=?, Join_Date=?
                WHERE Employee_ID=?
            ");
            if ($stmt->execute([$name, $gender, $dob, $phone, $email, $address, $department_id, $designation, $salary, $join_date, $emp_id])) {
                $message = "Employee details updated successfully.";
            }
        } else {
            // Insert
            $stmt = $pdo->prepare("
                INSERT INTO employees (Name, Gender, DOB, Phone, Email, Address, Department_ID, Designation, Salary, Join_Date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            try {
                $stmt->execute([$name, $gender, $dob, $phone, $email, $address, $department_id, $designation, $salary, $join_date]);
                $message = "New employee registered successfully.";
            } catch (\PDOException $e) {
                if ($e->getCode() == 23000) {
                    $error = "Email address already exists in the system.";
                } else {
                    $error = "Error: " . $e->getMessage();
                }
            }
        }
    }
}

// Handle Delete GET
if (isset($_GET['delete'])) {
    $delete_id = (int)$_GET['delete'];
    $stmt = $pdo->prepare("DELETE FROM employees WHERE Employee_ID = ?");
    if ($stmt->execute([$delete_id])) {
        $message = "Employee record deleted successfully.";
    }
}

// Filter & Search Parameters
$search = trim($_GET['search'] ?? '');
$deptFilter = $_GET['dept'] ?? '';

// Build Query with JOIN
$sql = "
    SELECT e.*, d.Department_Name, d.Manager_Name 
    FROM employees e 
    JOIN departments d ON e.Department_ID = d.Department_ID 
    WHERE 1=1 
";
$params = [];

if (!empty($search)) {
    $sql .= " AND (e.Name LIKE ? OR e.Email LIKE ? OR e.Designation LIKE ?) ";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

if (!empty($deptFilter)) {
    $sql .= " AND e.Department_ID = ? ";
    $params[] = $deptFilter;
}

$sql .= " ORDER BY e.Employee_ID DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$employees = $stmt->fetchAll();

// Fetch Departments for Dynamic Dropdown
$departments = $pdo->query("SELECT * FROM departments ORDER BY Department_Name ASC")->fetchAll();

require_once 'includes/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-user-tie text-primary me-2"></i>Employee Directory</h2>
        <p class="text-muted mb-0">Manage workforce, designations, compensation, and department placement.</p>
    </div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#empModal" onclick="clearEmpForm()">
        <i class="fa-solid fa-user-plus me-1"></i> Add Employee
    </button>
</div>

<?php if ($message): ?>
    <div class="alert alert-success alert-dismissible fade show">
        <i class="fa-solid fa-circle-check me-2"></i><?= htmlspecialchars($message) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if ($error): ?>
    <div class="alert alert-danger alert-dismissible fade show">
        <i class="fa-solid fa-triangle-exclamation me-2"></i><?= htmlspecialchars($error) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<!-- Search & Filter Bar -->
<div class="card p-3 mb-4 shadow-sm">
    <form method="GET" action="employees.php" class="row g-3">
        <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text bg-light"><i class="fa-solid fa-magnifying-glass text-muted"></i></span>
                <input type="text" name="search" class="form-control" placeholder="Search by Employee Name, Email, or Designation..." value="<?= htmlspecialchars($search) ?>">
            </div>
        </div>
        <div class="col-md-4">
            <select name="dept" class="form-select">
                <option value="">All Departments</option>
                <?php foreach ($departments as $d): ?>
                    <option value="<?= $d['Department_ID'] ?>" <?= $deptFilter == $d['Department_ID'] ? 'selected' : '' ?>>
                        <?= htmlspecialchars($d['Department_Name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-md-2 d-flex gap-2">
            <button type="submit" class="btn btn-secondary w-100"><i class="fa-solid fa-filter me-1"></i> Filter</button>
            <a href="employees.php" class="btn btn-outline-secondary"><i class="fa-solid fa-rotate-left"></i></a>
        </div>
    </form>
</div>

<!-- Employees Table -->
<div class="card shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">Emp ID</th>
                        <th>Name & Gender</th>
                        <th>Contact & Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Join Date</th>
                        <th class="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($employees)): ?>
                        <tr><td colspan="8" class="text-center py-4 text-muted">No employees found matching criteria.</td></tr>
                    <?php else: ?>
                        <?php foreach ($employees as $emp): ?>
                            <tr>
                                <td class="ps-4 fw-bold text-secondary">#<?= $emp['Employee_ID'] ?></td>
                                <td>
                                    <div class="fw-bold text-dark"><?= htmlspecialchars($emp['Name']) ?></div>
                                    <small class="text-muted"><i class="fa-solid fa-venus-mars me-1"></i><?= $emp['Gender'] ?></small>
                                </td>
                                <td>
                                    <div><i class="fa-solid fa-envelope me-1 text-primary"></i><?= htmlspecialchars($emp['Email']) ?></div>
                                    <small class="text-muted"><i class="fa-solid fa-phone me-1"></i><?= htmlspecialchars($emp['Phone']) ?></small>
                                </td>
                                <td>
                                    <span class="badge bg-primary bg-opacity-10 text-primary border border-primary px-2 py-1">
                                        <?= htmlspecialchars($emp['Department_Name']) ?>
                                    </span>
                                </td>
                                <td class="fw-medium text-dark"><?= htmlspecialchars($emp['Designation']) ?></td>
                                <td class="fw-bold text-success">$<?= number_format($emp['Salary'], 2) ?></td>
                                <td><?= htmlspecialchars($emp['Join_Date']) ?></td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-sm btn-outline-primary me-1" onclick='editEmp(<?= json_encode($emp) ?>)'>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <a href="employees.php?delete=<?= $emp['Employee_ID'] ?>" 
                                       class="btn btn-sm btn-outline-danger" 
                                       onclick="return confirm('Are you sure you want to delete this employee?');">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Add/Edit Employee Modal -->
<div class="modal fade" id="empModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" action="employees.php">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="empModalTitle">Add New Employee</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="Employee_ID" id="emp_id">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Full Name *</label>
                            <input type="text" name="Name" id="emp_name" class="form-control" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-semibold">Gender *</label>
                            <select name="Gender" id="emp_gender" class="form-select" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-semibold">DOB *</label>
                            <input type="date" name="DOB" id="emp_dob" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Email Address *</label>
                            <input type="email" name="Email" id="emp_email" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Phone Number *</label>
                            <input type="text" name="Phone" id="emp_phone" class="form-control" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label fw-semibold">Residential Address</label>
                            <input type="text" name="Address" id="emp_address" class="form-control" placeholder="123 Street Name, City">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Department *</label>
                            <select name="Department_ID" id="emp_dept_id" class="form-select" required>
                                <option value="">-- Select Department --</option>
                                <?php foreach ($departments as $d): ?>
                                    <option value="<?= $d['Department_ID'] ?>"><?= htmlspecialchars($d['Department_Name']) ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Designation *</label>
                            <input type="text" name="Designation" id="emp_designation" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Monthly Salary ($) *</label>
                            <input type="number" step="0.01" name="Salary" id="emp_salary" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Joining Date *</label>
                            <input type="date" name="Join_Date" id="emp_join_date" class="form-control" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-save me-1"></i> Save Employee</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function clearEmpForm() {
    document.getElementById('empModalTitle').innerText = 'Add New Employee';
    document.getElementById('emp_id').value = '';
    document.getElementById('emp_name').value = '';
    document.getElementById('emp_gender').value = 'Male';
    document.getElementById('emp_dob').value = '';
    document.getElementById('emp_email').value = '';
    document.getElementById('emp_phone').value = '';
    document.getElementById('emp_address').value = '';
    document.getElementById('emp_dept_id').value = '';
    document.getElementById('emp_designation').value = '';
    document.getElementById('emp_salary').value = '';
    document.getElementById('emp_join_date').value = new Date().toISOString().split('T')[0];
}

function editEmp(emp) {
    document.getElementById('empModalTitle').innerText = 'Edit Employee';
    document.getElementById('emp_id').value = emp.Employee_ID;
    document.getElementById('emp_name').value = emp.Name;
    document.getElementById('emp_gender').value = emp.Gender;
    document.getElementById('emp_dob').value = emp.DOB;
    document.getElementById('emp_email').value = emp.Email;
    document.getElementById('emp_phone').value = emp.Phone;
    document.getElementById('emp_address').value = emp.Address;
    document.getElementById('emp_dept_id').value = emp.Department_ID;
    document.getElementById('emp_designation').value = emp.Designation;
    document.getElementById('emp_salary').value = emp.Salary;
    document.getElementById('emp_join_date').value = emp.Join_Date;
    var myModal = new bootstrap.Modal(document.getElementById('empModal'));
    myModal.show();
}
</script>

<?php require_once 'includes/footer.php'; ?>`
  },
  {
    filename: 'attendance.php',
    category: 'pages',
    description: 'Attendance Logging with Date Filter, Check In/Out times, Status selection.',
    code: `<?php
require_once 'db.php';

$message = '';
$error = '';

// Handle Create / Edit Attendance
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $att_id = $_POST['Attendance_ID'] ?? null;
    $emp_id = $_POST['Employee_ID'] ?? '';
    $att_date = $_POST['Attendance_Date'] ?? date('Y-m-d');
    $check_in = $_POST['Check_In'] ?? '09:00:00';
    $check_out = $_POST['Check_Out'] ?? '17:00:00';
    $status = $_POST['Status'] ?? 'Present';

    if (empty($emp_id) || empty($att_date)) {
        $error = "Employee and Attendance Date are required.";
    } else {
        if ($att_id) {
            $stmt = $pdo->prepare("
                UPDATE attendance 
                SET Employee_ID=?, Attendance_Date=?, Check_In=?, Check_Out=?, Status=?
                WHERE Attendance_ID=?
            ");
            if ($stmt->execute([$emp_id, $att_date, $check_in, $check_out, $status, $att_id])) {
                $message = "Attendance record updated.";
            }
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO attendance (Employee_ID, Attendance_Date, Check_In, Check_Out, Status)
                VALUES (?, ?, ?, ?, ?)
            ");
            try {
                $stmt->execute([$emp_id, $att_date, $check_in, $check_out, $status]);
                $message = "Attendance logged successfully.";
            } catch (\PDOException $e) {
                if ($e->getCode() == 23000) {
                    $error = "Attendance already recorded for this employee on selected date.";
                } else {
                    $error = "Error: " . $e->getMessage();
                }
            }
        }
    }
}

// Handle Delete GET
if (isset($_GET['delete'])) {
    $delete_id = (int)$_GET['delete'];
    $stmt = $pdo->prepare("DELETE FROM attendance WHERE Attendance_ID = ?");
    $stmt->execute([$delete_id]);
    $message = "Attendance record removed.";
}

// Filter parameters
$filterDate = $_GET['date'] ?? date('Y-m-d');
$filterEmp = $_GET['emp_id'] ?? '';

// Build Query
$sql = "
    SELECT a.*, e.Name AS Employee_Name, d.Department_Name, e.Designation 
    FROM attendance a 
    JOIN employees e ON a.Employee_ID = e.Employee_ID 
    JOIN departments d ON e.Department_ID = d.Department_ID 
    WHERE 1=1 
";
$params = [];

if (!empty($filterDate)) {
    $sql .= " AND a.Attendance_Date = ? ";
    $params[] = $filterDate;
}

if (!empty($filterEmp)) {
    $sql .= " AND a.Employee_ID = ? ";
    $params[] = $filterEmp;
}

$sql .= " ORDER BY a.Attendance_Date DESC, a.Check_In ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$attendanceLogs = $stmt->fetchAll();

// Fetch Employees for Dropdown
$allEmployees = $pdo->query("SELECT Employee_ID, Name, Designation FROM employees ORDER BY Name ASC")->fetchAll();

require_once 'includes/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-calendar-check text-primary me-2"></i>Attendance Management</h2>
        <p class="text-muted mb-0">Record daily check-ins, check-outs, and track employee availability.</p>
    </div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#attModal" onclick="clearAttForm()">
        <i class="fa-solid fa-clock me-1"></i> Log Attendance
    </button>
</div>

<?php if ($message): ?>
    <div class="alert alert-success alert-dismissible fade show">
        <i class="fa-solid fa-circle-check me-2"></i><?= htmlspecialchars($message) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if ($error): ?>
    <div class="alert alert-danger alert-dismissible fade show">
        <i class="fa-solid fa-triangle-exclamation me-2"></i><?= htmlspecialchars($error) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<!-- Filter Bar -->
<div class="card p-3 mb-4 shadow-sm">
    <form method="GET" action="attendance.php" class="row g-3">
        <div class="col-md-5">
            <label class="form-label fw-semibold small text-muted">Select Date</label>
            <input type="date" name="date" class="form-control" value="<?= htmlspecialchars($filterDate) ?>">
        </div>
        <div class="col-md-5">
            <label class="form-label fw-semibold small text-muted">Filter Employee</label>
            <select name="emp_id" class="form-select">
                <option value="">All Employees</option>
                <?php foreach ($allEmployees as $emp): ?>
                    <option value="<?= $emp['Employee_ID'] ?>" <?= $filterEmp == $emp['Employee_ID'] ? 'selected' : '' ?>>
                        <?= htmlspecialchars($emp['Name']) ?> (<?= htmlspecialchars($emp['Designation']) ?>)
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-md-2 d-flex align-items-end gap-2">
            <button type="submit" class="btn btn-secondary w-100"><i class="fa-solid fa-filter me-1"></i> Search</button>
            <a href="attendance.php" class="btn btn-outline-secondary"><i class="fa-solid fa-rotate-left"></i></a>
        </div>
    </form>
</div>

<!-- Logs Table -->
<div class="card shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">Date</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                        <th class="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($attendanceLogs)): ?>
                        <tr><td colspan="7" class="text-center py-4 text-muted">No attendance logs found for the selected filter.</td></tr>
                    <?php else: ?>
                        <?php foreach ($attendanceLogs as $log): ?>
                            <tr>
                                <td class="ps-4 fw-bold text-dark"><?= htmlspecialchars($log['Attendance_Date']) ?></td>
                                <td>
                                    <div class="fw-bold text-primary"><?= htmlspecialchars($log['Employee_Name']) ?></div>
                                    <small class="text-muted"><?= htmlspecialchars($log['Designation']) ?></small>
                                </td>
                                <td><?= htmlspecialchars($log['Department_Name']) ?></td>
                                <td><i class="fa-regular fa-clock me-1 text-success"></i><?= htmlspecialchars($log['Check_In']) ?></td>
                                <td><i class="fa-regular fa-clock me-1 text-danger"></i><?= htmlspecialchars($log['Check_Out']) ?></td>
                                <td>
                                    <?php
                                    $badge = 'bg-secondary';
                                    if ($log['Status'] == 'Present') $badge = 'badge-present';
                                    if ($log['Status'] == 'Late') $badge = 'badge-late';
                                    if ($log['Status'] == 'Absent') $badge = 'badge-absent';
                                    if ($log['Status'] == 'Half Day') $badge = 'badge-halfday';
                                    ?>
                                    <span class="badge <?= $badge ?> px-2 py-1"><?= htmlspecialchars($log['Status']) ?></span>
                                </td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-sm btn-outline-primary me-1" onclick='editAtt(<?= json_encode($log) ?>)'>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <a href="attendance.php?delete=<?= $log['Attendance_ID'] ?>" 
                                       class="btn btn-sm btn-outline-danger" 
                                       onclick="return confirm('Delete this attendance entry?');">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="attModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" action="attendance.php">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="attModalTitle">Log Employee Attendance</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="Attendance_ID" id="att_id">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Employee *</label>
                        <select name="Employee_ID" id="att_emp_id" class="form-select" required>
                            <option value="">-- Select Employee --</option>
                            <?php foreach ($allEmployees as $emp): ?>
                                <option value="<?= $emp['Employee_ID'] ?>"><?= htmlspecialchars($emp['Name']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Date *</label>
                        <input type="date" name="Attendance_Date" id="att_date" class="form-control" required>
                    </div>
                    <div class="row g-2 mb-3">
                        <div class="col-6">
                            <label class="form-label fw-semibold">Check In</label>
                            <input type="time" name="Check_In" id="att_check_in" class="form-control" value="09:00">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold">Check Out</label>
                            <input type="time" name="Check_Out" id="att_check_out" class="form-control" value="17:00">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Attendance Status *</label>
                        <select name="Status" id="att_status" class="form-select" required>
                            <option value="Present">Present</option>
                            <option value="Late">Late</option>
                            <option value="Absent">Absent</option>
                            <option value="Half Day">Half Day</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-save me-1"></i> Save Attendance</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function clearAttForm() {
    document.getElementById('attModalTitle').innerText = 'Log Employee Attendance';
    document.getElementById('att_id').value = '';
    document.getElementById('att_emp_id').value = '';
    document.getElementById('att_date').value = new Date().toISOString().split('T')[0];
    document.getElementById('att_check_in').value = '09:00';
    document.getElementById('att_check_out').value = '17:00';
    document.getElementById('att_status').value = 'Present';
}

function editAtt(log) {
    document.getElementById('attModalTitle').innerText = 'Edit Attendance Entry';
    document.getElementById('att_id').value = log.Attendance_ID;
    document.getElementById('att_emp_id').value = log.Employee_ID;
    document.getElementById('att_date').value = log.Attendance_Date;
    document.getElementById('att_check_in').value = log.Check_In;
    document.getElementById('att_check_out').value = log.Check_Out;
    document.getElementById('att_status').value = log.Status;
    var myModal = new bootstrap.Modal(document.getElementById('attModal'));
    myModal.show();
}
</script>

<?php require_once 'includes/footer.php'; ?>`
  },
  {
    filename: 'reports.php',
    category: 'pages',
    description: 'System Reports with Department Payroll Summary & Attendance Rate calculation.',
    code: `<?php
require_once 'db.php';
require_once 'includes/header.php';

// 1. Department Summary Report
$deptReports = $pdo->query("
    SELECT 
        d.Department_Name, 
        d.Manager_Name, 
        COUNT(e.Employee_ID) AS Total_Employees,
        COALESCE(SUM(e.Salary), 0) AS Total_Payroll,
        COALESCE(AVG(e.Salary), 0) AS Avg_Salary
    FROM departments d
    LEFT JOIN employees e ON d.Department_ID = e.Department_ID
    GROUP BY d.Department_ID
    ORDER BY Total_Payroll DESC
")->fetchAll();

// 2. Attendance Status Breakdown
$attSummary = $pdo->query("
    SELECT 
        Status, 
        COUNT(*) AS Status_Count
    FROM attendance
    GROUP BY Status
")->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-chart-line text-primary me-2"></i>Reports & Analytics</h2>
        <p class="text-muted mb-0">System-wide reports on department payroll, headcount distribution, and attendance.</p>
    </div>
    <button onclick="window.print()" class="btn btn-outline-dark">
        <i class="fa-solid fa-print me-1"></i> Print / Export Report
    </button>
</div>

<!-- Department Payroll Summary -->
<div class="card mb-4 shadow-sm">
    <div class="card-header bg-white fw-bold py-3">
        <i class="fa-solid fa-sack-dollar text-success me-2"></i>Department Payroll & Allocation Breakdown
    </div>
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-striped align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">Department</th>
                        <th>Manager</th>
                        <th>Staff Count</th>
                        <th>Average Salary</th>
                        <th>Total Monthly Payroll</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($deptReports as $dr): ?>
                        <tr>
                            <td class="ps-4 fw-bold text-primary"><?= htmlspecialchars($dr['Department_Name']) ?></td>
                            <td><?= htmlspecialchars($dr['Manager_Name']) ?></td>
                            <td><span class="badge bg-secondary"><?= $dr['Total_Employees'] ?></span></td>
                            <td>$<?= number_format($dr['Avg_Salary'], 2) ?></td>
                            <td class="fw-bold text-success">$<?= number_format($dr['Total_Payroll'], 2) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Attendance Distribution -->
<div class="row g-4">
    <div class="col-md-6">
        <div class="card shadow-sm h-100">
            <div class="card-header bg-white fw-bold py-3">
                <i class="fa-solid fa-chart-pie text-info me-2"></i>Attendance Status Totals
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <?php foreach ($attSummary as $att): ?>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <span class="fw-medium"><?= htmlspecialchars($att['Status']) ?> Logs</span>
                            <span class="badge bg-primary rounded-pill px-3 py-2"><?= $att['Status_Count'] ?> Records</span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card shadow-sm h-100 bg-primary bg-opacity-10 border-primary">
            <div class="card-body p-4 d-flex flex-column justify-content-center align-items-center text-center">
                <i class="fa-solid fa-database fa-3x text-primary mb-3"></i>
                <h4 class="fw-bold text-dark mb-2">Relational Database Verified</h4>
                <p class="text-muted small mb-0">
                    All tables maintaining referential integrity (departments.Department_ID &rarr; employees.Department_ID and employees.Employee_ID &rarr; attendance.Employee_ID).
                </p>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>`
  }
];
