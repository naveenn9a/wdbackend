const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const statusSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
      default: "english"
    },
    likes: {
      type: Number,
      default: 0
    },
    copy: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
statusSchema.plugin(toJSON);
statusSchema.plugin(paginate);

/**
 * Check if slug is taken
 * @param {string} slug - The status's slug
 * @param {ObjectId} [excludeStatusId] - The id of the status to be excluded
 * @returns {Promise<boolean>}
 */
statusSchema.statics.isStatusSlugTaken = async function (slug, excludeStatusId) {
  const status = await this.findOne({ slug, _id: { $ne: excludeStatusId } });
  return !!status;
};

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// statusSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// statusSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

/**
 * @typedef Status
 */
const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
