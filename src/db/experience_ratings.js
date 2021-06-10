/**
 * @typedef {Object} ExperienceRating
 * @property {number} rating
 * @property {string | null} feedback
 * @property {string} submitted_at
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} id
 * @property {number} actor_id
 * @property {number} room_id
 */

class ExperienceRatings {
  /**
   * Creates a new experience rating entry
   * @param {number} actorId
   * @param {number} roomId
   * @param {number} rating 1-5
   * @param {Date} submittedAt
   * @param {string | null} feedback
   * @returns {Promise<ExperienceRating>}
   */
  async createRating(actorId, roomId, rating, submittedAt, feedback) {
    return shared.db.pg.massive.experience_ratings.insert({
      actor_id: actorId,
      room_id: roomId,
      submitted_at: submittedAt.toUTCString(),
      rating,
      feedback
    })
  }

  /**
   *
   * @param {number} ratingId
   * @param {Object} updates
   * @param {number | undefined} updates.rating
   * @param {string | undefined} updates.feedback
   * @returns {Promise<ExperienceRating>}
   */
  async updateRating(ratingId, updates) {
    return shared.db.pg.massive.experience_ratings.update(ratingId, updates)
  }

  /**
   * Gets a single rating by ID
   * @param {number} ratingId
   * @returns {Promise<ExperienceRating | null>}
   */
  async getRating(ratingId) {
    return shared.db.pg.massive.experience_ratings.findOne({
      id: ratingId
    })
  }
}

module.exports = new ExperienceRatings()
