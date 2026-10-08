/**
 * Reminder Model (ES6 Class)
 * Mirrors the class diagram: Reminder
 * 
 * Attributes:
 * - reminderId: Unique identifier for reminder
 * - beneficiaryId: ID of recipient beneficiary
 * - message: Notification message text (e.g. pending verification, payment disbursed)
 * - reminderDate: Date reminder was created/scheduled
 * - status: 'Pending' or 'Sent'
 * 
 * Business Rule:
 * - Reminders are logged in the database and shown in-app (no real SMS required).
 * 
 * Relationships:
 * - Beneficiary 1 - * Reminder
 */

const db = require('../config/db');

class Reminder {
  constructor({
    reminderId = null,
    beneficiaryId,
    message,
    reminderDate = new Date().toISOString().split('T')[0],
    status = 'Pending'
  }) {
    this.reminderId = reminderId;
    this.beneficiaryId = beneficiaryId;
    this.message = message;
    this.reminderDate = reminderDate;
    this.status = status;
  }

  /**
   * Create and store a new in-app reminder
   * Viva explanation: Logs a notification in MySQL for the beneficiary or admin
   */
  async createReminder() {
    const sql = `
      INSERT INTO reminders (beneficiary_id, message, reminder_date, status)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      this.beneficiaryId,
      this.message,
      this.reminderDate,
      this.status
    ]);
    this.reminderId = result.insertId;
    return this;
  }

  /**
   * Mark reminder as sent / delivered in-app
   * Viva explanation: Updates status flag to 'Sent'
   */
  async markAsSent() {
    this.status = 'Sent';
    const sql = `
      UPDATE reminders
      SET status = 'Sent'
      WHERE reminder_id = ?
    `;
    await db.query(sql, [this.reminderId]);
    return this;
  }

  /**
   * Static lookup by Beneficiary ID
   */
  static async findByBeneficiaryId(beneficiaryId) {
    const sql = `SELECT * FROM reminders WHERE beneficiary_id = ? ORDER BY reminder_date DESC`;
    const rows = await db.query(sql, [beneficiaryId]);
    return rows.map(row => new Reminder({
      reminderId: row.reminder_id,
      beneficiaryId: row.beneficiary_id,
      message: row.message,
      reminderDate: row.reminder_date,
      status: row.status
    }));
  }
}

module.exports = Reminder;
