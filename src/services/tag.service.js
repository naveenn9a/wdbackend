const httpStatus = require('http-status');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a tag
 * @param {Object} tagBody
 * @returns {Promise<Tag>}
 */
const createTag = async (tagBody) => {
//   if (await Tag.isEmailTaken(tagBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
  return Tag.create(tagBody);
};

/**
 * Query for tags
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTags = async (filter, options) => {
  const tags = await Tag.paginate(filter, options);
  return tags;
};

/**
 * Get tag   by id
 * @param {ObjectId} id
 * @returns {Promise<Tag>}
 */
const getTagById = async (id) => {
  return Tag.findById(id);
};

/**
 * Get tag by slug
 * @param {string} email
 * @returns {Promise<Tag>}
 */
const getTagBySlug = async (slug) => {
  return Tag.findOne({ slug });
};

/**
 * Update tag by id
 * @param {ObjectId} tagId
 * @param {Object} updateBody
 * @returns {Promise<Tag>}
 */
const updateTagById = async (tagId, updateBody) => {
  const tag = await getTagById(tagId);
  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }
  if (updateBody.slug && (await Tag.isTagSlugTaken(updateBody.slug, tagId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tag already exist');
  }
  Object.assign(tag, updateBody);
  await tag.save();
  return tag;
};

/**
 * Delete tag by id
 * @param {ObjectId} tagId
 * @returns {Promise<Tag>}
 */
const deleteTagById = async (tagId) => {
  const tag = await getTagById(tagId);
  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }
  await tag.remove();
  return tag;
};

module.exports = {
  createTag,
  queryTags,
  getTagById,
  getTagBySlug,
  updateTagById,
  deleteTagById,
};
