/**
 * Verification Model (ES6 Class)
 * Mirrors the class diagram: Verification
 * 
 * Attributes:
 * - verificationId: Unique identifier for verification record
 * - beneficiaryId: ID of beneficiary being verified
 * - pensionId: (Optional) ID of associated pension
 * - verifiedBy: Name/designation of verifying official
 * - verifyDate: Date when verification was performed
 * - status: 'Pending', 'Verified', 'Rejected'
 * - remarks: Verification notes / document status
 * 
 * Relationships:
 * - Pension 1 - 1 Verification
 */

const db = require('../config/db');

class Verification {
  constructor({
    verificationId = null,
    beneficiaryId,
    pensionId = null,
    verifiedBy = 'Pending Review',
    verifyDate = null,
    status = 'Pending',
    remarks = null
  }) {
    this.verificationId = verificationId;
    this.beneficiaryId = beneficiaryId;
    this.pensionId = pensionId;
    this.verifiedBy = verifiedBy;
    this.verifyDate = verifyDate;
    this.status = status;
    this.remarks = remarks;
  }

  /**
   * Conduct verification by an admin/official
   * Viva explanation: Sets status to Verified or Rejected and records who verified it
   */
  async verify(verifiedBy, status = 'Verified', remarks = '') {
    this.verifiedBy = verifiedBy;
    this.status = status;
    this.remarks = remarks;
    this.verifyDate = new Date().toISOString().split('T')[0];

    const sql = `
      INSERT INTO verifications (beneficiary_id, pension_id, verified_by, verify_date, status, remarks)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      this.beneficiaryId,
      this.pensionId,
      this.verifiedBy,
      this.verifyDate,
      this.status,
      this.remarks
    ]);
    this.verificationId = result.insertId;
    return this;
  }

  /**
   * Update existing verification details
   * Viva explanation: Modifies verification status, official notes or reviewer
   */
  async updateVerification({ status, verifiedBy, remarks }) {
    if (status !== undefined) this.status = status;
    if (verifiedBy !== undefined) this.verifiedBy = verifiedBy;
    if (remarks !== undefined) this.remarks = remarks;
    this.verifyDate = new Date().toISOString().split('T')[0];

    const sql = `
      UPDATE verifications
      SET status = ?, verified_by = ?, remarks = ?, verify_date = ?
      WHERE verification_id = ?
    `;
    await db.query(sql, [this.status, this.verifiedBy, this.remarks, this.verifyDate, this.verificationId]);
    return this;
  }

  /**
   * Static lookup by Beneficiary ID
   */
  static async findByBeneficiaryId(beneficiaryId) {
    const sql = `SELECT * FROM verifications WHERE beneficiary_id = ? ORDER BY verification_id DESC`;
    const rows = await db.query(sql, [beneficiaryId]);
    return rows.map(row => new Verification({
      verificationId: row.verification_id,
      beneficiaryId: row.beneficiary_id,
      pensionId: row.pension_id,
      verifiedBy: row.verified_by,
      verifyDate: row.verify_date,
      status: row.status,
      remarks: row.remarks
    }));
  }
}

module.exports = Verification;
