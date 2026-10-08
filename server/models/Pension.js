/**
 * Pension Model (ES6 Class)
 * Mirrors the class diagram: Pension
 * 
 * Attributes:
 * - pensionId: Unique identifier for the pension allocation
 * - beneficiaryId: Foreign key referencing Beneficiary
 * - amount: Monthly/disbursement pension amount in Rupees (e.g., 2016.00)
 * - frequency: Frequency of disbursement ('Monthly', 'Quarterly')
 * - startDate: Date when pension becomes active
 * 
 * Relationships:
 * - Beneficiary 1 - * Pension
 * - Pension 1 - * Payment
 * - Pension 1 - 1 Verification
 */

const db = require('../config/db');

class Pension {
  constructor({ pensionId = null, beneficiaryId, amount, frequency = 'Monthly', startDate, status = 'Active' }) {
    this.pensionId = pensionId;
    this.beneficiaryId = beneficiaryId;
    this.amount = parseFloat(amount);
    this.frequency = frequency;
    this.startDate = startDate;
    this.status = status;
  }

  /**
   * Create a new pension record for a beneficiary
   * Viva explanation: Records the approved pension amount and frequency for a verified citizen
   */
  async createPension() {
    const sql = `
      INSERT INTO pensions (beneficiary_id, amount, frequency, start_date, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      this.beneficiaryId,
      this.amount,
      this.frequency,
      this.startDate,
      this.status
    ]);
    this.pensionId = result.insertId;
    return this;
  }

  /**
   * Update pension details (e.g. increase pension amount or change frequency)
   * Viva explanation: Modifies existing pension configuration
   */
  async updatePension({ amount, frequency, status }) {
    if (amount !== undefined) this.amount = parseFloat(amount);
    if (frequency !== undefined) this.frequency = frequency;
    if (status !== undefined) this.status = status;

    const sql = `
      UPDATE pensions
      SET amount = ?, frequency = ?, status = ?
      WHERE pension_id = ?
    `;
    await db.query(sql, [this.amount, this.frequency, this.status, this.pensionId]);
    return this;
  }

  /**
   * Static lookup by ID
   */
  static async findById(id) {
    const sql = `SELECT * FROM pensions WHERE pension_id = ?`;
    const rows = await db.query(sql, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Pension({
      pensionId: row.pension_id,
      beneficiaryId: row.beneficiary_id,
      amount: row.amount,
      frequency: row.frequency,
      startDate: row.start_date,
      status: row.status
    });
  }

  /**
   * Find all pensions for a specific beneficiary
   */
  static async findByBeneficiaryId(beneficiaryId) {
    const sql = `SELECT * FROM pensions WHERE beneficiary_id = ?`;
    const rows = await db.query(sql, [beneficiaryId]);
    return rows.map(row => new Pension({
      pensionId: row.pension_id,
      beneficiaryId: row.beneficiary_id,
      amount: row.amount,
      frequency: row.frequency,
      startDate: row.start_date,
      status: row.status
    }));
  }
}

module.exports = Pension;
