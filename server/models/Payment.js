/**
 * Payment Model (ES6 Class)
 * Mirrors the class diagram: Payment
 * 
 * Attributes:
 * - paymentId: Unique identifier for the payment
 * - pensionId: Foreign key referencing Pension
 * - amount: Amount disbursed (in Rupees)
 * - dueDate: Scheduled due date for payment
 * - payDate: Actual date payment was disbursed (null if pending/delayed)
 * - status: 'Paid', 'Pending', or 'Delayed'
 * - transactionRef: Bank reference / UTR code
 * 
 * Business Rule:
 * - A payment is "Delayed" when today is more than 7 days past its due date and status is not 'Paid'.
 * 
 * Relationships:
 * - Pension 1 - * Payment
 */

const db = require('../config/db');

class Payment {
  constructor({
    paymentId = null,
    pensionId,
    amount,
    dueDate = new Date().toISOString().split('T')[0],
    payDate = null,
    status = 'Pending',
    transactionRef = null
  }) {
    this.paymentId = paymentId;
    this.pensionId = pensionId;
    this.amount = parseFloat(amount);
    this.dueDate = dueDate;
    this.payDate = payDate;
    this.status = status;
    this.transactionRef = transactionRef;
  }

  /**
   * Record a new pension payment/disbursement
   * Viva explanation: Creates a payment record in MySQL with initial status
   */
  async recordPayment() {
    const sql = `
      INSERT INTO payments (pension_id, amount, due_date, pay_date, status, transaction_ref)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      this.pensionId,
      this.amount,
      this.dueDate,
      this.payDate,
      this.status,
      this.transactionRef
    ]);
    this.paymentId = result.insertId;
    return this;
  }

  /**
   * Update payment status (e.g. from Pending -> Paid, or marking Delayed)
   * Viva explanation: Updates status and records payDate/transaction reference when money is released
   */
  async updateStatus(newStatus, { payDate = null, transactionRef = null } = {}) {
    this.status = newStatus;
    if (payDate) this.payDate = payDate;
    if (transactionRef) this.transactionRef = transactionRef;

    const sql = `
      UPDATE payments
      SET status = ?, pay_date = COALESCE(?, pay_date), transaction_ref = COALESCE(?, transaction_ref)
      WHERE payment_id = ?
    `;
    await db.query(sql, [this.status, payDate, transactionRef, this.paymentId]);
    return this;
  }

  /**
   * Check and update delayed payments automatically based on Business Rule:
   * "A payment is Delayed when today is more than 7 days past its due date and it is not Paid."
   */
  static async checkAndUpdateDelays() {
    const sql = `
      UPDATE payments
      SET status = 'Delayed'
      WHERE status = 'Pending'
        AND DATEDIFF(CURDATE(), due_date) > 7
    `;
    return await db.query(sql);
  }

  /**
   * Static lookup by ID
   */
  static async findById(id) {
    const sql = `SELECT * FROM payments WHERE payment_id = ?`;
    const rows = await db.query(sql, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Payment({
      paymentId: row.payment_id,
      pensionId: row.pension_id,
      amount: row.amount,
      dueDate: row.due_date,
      payDate: row.pay_date,
      status: row.status,
      transactionRef: row.transaction_ref
    });
  }

  /**
   * Find payments for a pension record
   */
  static async findByPensionId(pensionId) {
    const sql = `SELECT * FROM payments WHERE pension_id = ? ORDER BY due_date DESC`;
    const rows = await db.query(sql, [pensionId]);
    return rows.map(row => new Payment({
      paymentId: row.payment_id,
      pensionId: row.pension_id,
      amount: row.amount,
      dueDate: row.due_date,
      payDate: row.pay_date,
      status: row.status,
      transactionRef: row.transaction_ref
    }));
  }
}

module.exports = Payment;
