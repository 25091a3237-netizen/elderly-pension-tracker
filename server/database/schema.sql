-- ====================================================================
-- Elderly Pension Disbursement Tracker - Database Schema (MySQL)
-- Problem Statement: 126
-- ====================================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS pension_db;
USE pension_db;

-- 2. Beneficiaries Table
-- Mirrors: Beneficiary(beneficiaryId, name, age, address, phoneNo)
CREATE TABLE IF NOT EXISTS beneficiaries (
  beneficiary_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  address TEXT NOT NULL,
  phone_no VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Pensions Table
-- Mirrors: Pension(pensionId, beneficiaryId, amount, frequency, startDate)
-- Relationship: Beneficiary 1-* Pension
CREATE TABLE IF NOT EXISTS pensions (
  pension_id INT AUTO_INCREMENT PRIMARY KEY,
  beneficiary_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  frequency VARCHAR(20) DEFAULT 'Monthly', -- Monthly, Quarterly, etc.
  start_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Active', -- Active, Inactive, Suspended
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(beneficiary_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Verifications Table
-- Mirrors: Verification(verificationId, beneficiaryId, verifiedBy, verifyDate, status)
-- Relationship: Pension 1-1 Verification (and Beneficiary verification)
CREATE TABLE IF NOT EXISTS verifications (
  verification_id INT AUTO_INCREMENT PRIMARY KEY,
  beneficiary_id INT NOT NULL,
  pension_id INT NULL,
  verified_by VARCHAR(100) DEFAULT 'Admin Officer',
  verify_date DATE NULL,
  status VARCHAR(20) DEFAULT 'Pending', -- Pending, Verified, Rejected
  remarks TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(beneficiary_id) ON DELETE CASCADE,
  FOREIGN KEY (pension_id) REFERENCES pensions(pension_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Payments Table
-- Mirrors: Payment(paymentId, pensionId, amount, payDate, status)
-- Relationship: Pension 1-* Payment
-- Business Rule: Status is Paid, Pending, or Delayed (>7 days past due date & unpaid)
CREATE TABLE IF NOT EXISTS payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  pension_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  pay_date DATE NULL,
  status VARCHAR(20) DEFAULT 'Pending', -- Paid, Pending, Delayed
  transaction_ref VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pension_id) REFERENCES pensions(pension_id) ON DELETE CASCADE,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Reminders Table
-- Mirrors: Reminder(reminderId, beneficiaryId, message, reminderDate, status)
-- Relationship: Beneficiary 1-* Reminder
CREATE TABLE IF NOT EXISTS reminders (
  reminder_id INT AUTO_INCREMENT PRIMARY KEY,
  beneficiary_id INT NOT NULL,
  message TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending', -- Pending, Sent
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(beneficiary_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Seed Sample Data for Testing
INSERT INTO beneficiaries (name, age, address, phone_no) VALUES
('Narasimha Rao', 68, 'H.No 3-45, Gandhi Nagar, Warangal, Telangana', '9876543210'),
('Lakshmi Devi', 72, 'Plot 12, Ramalayam Veedhi, Nalgonda, Telangana', '9848012345'),
('Venkat Reddy', 65, 'Main Road, Janagaon Village, Medak, Telangana', '9912345678')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO pensions (beneficiary_id, amount, frequency, start_date, status) VALUES
(1, 2016.00, 'Monthly', '2024-01-01', 'Active'),
(2, 2016.00, 'Monthly', '2024-02-01', 'Active'),
(3, 3016.00, 'Monthly', '2024-03-01', 'Active')
ON DUPLICATE KEY UPDATE amount=amount;

INSERT INTO verifications (beneficiary_id, pension_id, verified_by, verify_date, status, remarks) VALUES
(1, 1, 'Mandal Revenue Officer', '2024-01-05', 'Verified', 'Documents verified successfully'),
(2, 2, 'Panchayat Secretary', '2024-02-08', 'Verified', 'Aadhar and age verified'),
(3, 3, 'Pending Review', NULL, 'Pending', 'Physical verification pending')
ON DUPLICATE KEY UPDATE status=status;

INSERT INTO payments (pension_id, amount, due_date, pay_date, status, transaction_ref) VALUES
(1, 2016.00, '2024-09-01', '2024-09-03', 'Paid', 'TXN-902148'),
(2, 2016.00, '2024-09-01', '2024-09-05', 'Paid', 'TXN-902149'),
(1, 2016.00, '2024-10-01', NULL, 'Delayed', NULL),
(2, 2016.00, '2024-10-01', NULL, 'Delayed', NULL),
(3, 3016.00, '2024-10-01', NULL, 'Pending', NULL)
ON DUPLICATE KEY UPDATE status=status;

INSERT INTO reminders (beneficiary_id, message, reminder_date, status) VALUES
(3, 'Your pension verification is pending with the local officer. Please submit required documents.', '2024-10-02', 'Pending'),
(1, 'October pension disbursement is in process.', '2024-10-01', 'Sent')
ON DUPLICATE KEY UPDATE status=status;
