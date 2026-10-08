/**
 * Beneficiary Model (ES6 Class)
 * Mirrors the class diagram: Beneficiary
 * 
 * Attributes:
 * - beneficiaryId: Unique identifier for the elderly citizen
 * - name: Full name of the beneficiary
 * - age: Age of the citizen (elderly verification)
 * - address: Residential address for pension delivery
 * - phoneNo: Registered phone number used for lookup and alerts
 * 
 * Relationships:
 * - 1 Beneficiary can have many Pensions (1 - *)
 * - 1 Beneficiary can have many Reminders (1 - *)
 */

const db = require('../config/db');

class Beneficiary {
  constructor({ beneficiaryId = null, name, age, address, phoneNo }) {
    this.beneficiaryId = beneficiaryId;
    this.name = name;
    this.age = parseInt(age, 10);
    this.address = address;
    this.phoneNo = phoneNo;
  }

  /**
   * Register a new beneficiary in the database
   * Viva explanation: Saves the beneficiary's personal details to MySQL
   */
  async register() {
    const sql = `
      INSERT INTO beneficiaries (name, age, address, phone_no)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.query(sql, [this.name, this.age, this.address, this.phoneNo]);
    this.beneficiaryId = result.insertId;
    return this;
  }

  /**
   * Update beneficiary contact or personal details
   * Viva explanation: Modifies existing beneficiary records using parameterized SQL
   */
  async updateDetails({ name, age, address, phoneNo }) {
    if (name) this.name = name;
    if (age) this.age = parseInt(age, 10);
    if (address) this.address = address;
    if (phoneNo) this.phoneNo = phoneNo;

    const sql = `
      UPDATE beneficiaries
      SET name = ?, age = ?, address = ?, phone_no = ?
      WHERE beneficiary_id = ?
    `;
    await db.query(sql, [this.name, this.age, this.address, this.phoneNo, this.beneficiaryId]);
    return this;
  }

  /**
   * View complete status for the beneficiary
   * Returns personal details, verification state, active pensions, and payments.
   * Viva explanation: Public portal queries this to give transparency to citizens.
   */
  async viewStatus() {
    // 1. Get verification details
    const verificationSql = `SELECT * FROM verifications WHERE beneficiary_id = ? ORDER BY verification_id DESC LIMIT 1`;
    const verifications = await db.query(verificationSql, [this.beneficiaryId]);

    // 2. Get pension schemes
    const pensionSql = `SELECT * FROM pensions WHERE beneficiary_id = ?`;
    const pensions = await db.query(pensionSql, [this.beneficiaryId]);

    // 3. Get recent payments across pensions
    const paymentSql = `
      SELECT p.*, pay.payment_id, pay.amount as paid_amount, pay.due_date, pay.pay_date, pay.status as payment_status, pay.transaction_ref
      FROM pensions p
      LEFT JOIN payments pay ON p.pension_id = pay.pension_id
      WHERE p.beneficiary_id = ?
      ORDER BY pay.due_date DESC
    `;
    const payments = await db.query(paymentSql, [this.beneficiaryId]);

    // 4. Get in-app reminders
    const reminderSql = `SELECT * FROM reminders WHERE beneficiary_id = ? ORDER BY reminder_date DESC`;
    const reminders = await db.query(reminderSql, [this.beneficiaryId]);

    return {
      beneficiary: {
        beneficiaryId: this.beneficiaryId,
        name: this.name,
        age: this.age,
        address: this.address,
        phoneNo: this.phoneNo
      },
      verification: verifications[0] || null,
      pensions: pensions,
      payments: payments,
      reminders: reminders
    };
  }

  /**
   * Find beneficiary by ID
   */
  static async findById(id) {
    const sql = `SELECT * FROM beneficiaries WHERE beneficiary_id = ?`;
    const rows = await db.query(sql, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Beneficiary({
      beneficiaryId: row.beneficiary_id,
      name: row.name,
      age: row.age,
      address: row.address,
      phoneNo: row.phone_no
    });
  }

  /**
   * Find beneficiary by phone number and ID (used for citizen public login/lookup)
   */
  static async findByPhoneAndId(phoneNo, beneficiaryId) {
    const sql = `SELECT * FROM beneficiaries WHERE phone_no = ? AND beneficiary_id = ?`;
    const rows = await db.query(sql, [phoneNo, beneficiaryId]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Beneficiary({
      beneficiaryId: row.beneficiary_id,
      name: row.name,
      age: row.age,
      address: row.address,
      phoneNo: row.phone_no
    });
  }
}

module.exports = Beneficiary;
