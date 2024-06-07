class Query {
  /**
   * Create a session record in the database and return the created session
   * @param {Client} client - database client
   * @param {number} totalDuration - Total session duration in minutes
   * @param {number} workDuration - Work duration in minutes
   * @param {number} breakDuration - break duration in minutes
   * @returns {Object|null} - The created session or null if an error occurs
   */
  static async createRecord(client, totalDuration, workDuration, breakDuration) {
    try {
      // Validate input values
      if (!Number.isInteger(totalDuration) || !Number.isInteger(workDuration) || !Number.isInteger(breakDuration)) {
        throw new Error('Invalid input values. Please provide integer values for totalDuration, workDuration, and breakDuration.');
      }

      const query = {
        text: 'INSERT INTO history (total_duration, work_duration, rest_duration) VALUES ($1, $2, $3) RETURNING *',
        values: [totalDuration, workDuration, breakDuration]
      };
      const result = await client.query(query);

      if (result.rows.length > 0) {
        console.log('New record created:', result.rows[0]);
        return result.rows[0];
      } else {
        throw new Error('Failed to create record.');
      }
    } catch (err) {
      console.error('Error creating record:', err.message);
      return null;
    }
  }

  /**
   * Return all the recorded sessions
   * @param {Client} client - database client
   * @returns {Object[]|null} - Array of recorded sessions or null if an error occurs
   */
  static async readAllRecords(client) {
    try {
      const query = {
        text: 'SELECT * FROM history',
      };
      const result = await client.query(query);

      console.log('Records:', result.rows);
      return result.rows;
    } catch (err) {
      console.error('Error reading records:', err.message);
      return null;
    }
  }
}

module.exports = Query;
