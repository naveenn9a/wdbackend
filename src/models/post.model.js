const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const Product = require('./product.model');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    description: {
      type: String,
      trim: true,
    },
    content: {
      type: Object,
      trim: true,
    },
    products: {
      type: Array,
    },
    publishedDate: {
      type: Date
    },
    tags: {
      type: Array,
      trim: true,
    },
    category: {
      type: Array,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * Check if slug is taken
 * @param {string} slug - The post's slug
 * @param {ObjectId} [excludePostId] - The id of the post to be excluded
 * @returns {Promise<boolean>}
 */
postSchema.statics.isPostSlugTaken = async function (slug, excludePostId) {
  const post = await this.findOne({ slug, _id: { $ne: excludePostId } });
  return !!post;
};

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// postSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// postSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
