const httpStatus = require('http-status');
const { Status } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a status
 * @param {Object} statusBody
 * @returns {Promise<Status>}
 */
const createStatus = async (statusBody) => {
//   if (await Status.isEmailTaken(statusBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
  return Status.create(statusBody);
};

/**
 * Query for statuses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStatuses = async (filter, options) => {
  const statuses = await Status.paginate(filter, options);
  return statuses;
};

/**
 * Get status   by id
 * @param {ObjectId} id
 * @returns {Promise<Status>}
 */
const getStatusById = async (id) => {
  return Status.findById(id);
};

/**
 * Get status by slug
 * @param {string} email
 * @returns {Promise<Status>}
 */
const getStatusBySlug = async (slug) => {
  return Status.findOne({ slug });
};

/**
 * Update status by id
 * @param {ObjectId} statusId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateStatusById = async (statusId, updateBody) => {
  const status = await getStatusById(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status not found');
  }
  if (updateBody.slug && (await Status.isStatusSlugTaken(updateBody.slug, statusId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Status already exist');
  }
  Object.assign(status, updateBody);
  await status.save();
  return status;
};

/**
 * Delete status by id
 * @param {ObjectId} statusId
 * @returns {Promise<Status>}
 */
const deleteStatusById = async (statusId) => {
  const status = await getStatusById(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status not found');
  }
  await status.remove();
  return status;
};

module.exports = {
  createStatus,
  queryStatuses,
  getStatusById,
  getStatusBySlug,
  updateStatusById,
  deleteStatusById,
};
