const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: {
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
    tags: {
      type: Array,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    category: {
      type: Array,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    price: {
      type: String,
      trim: true
    },
    specEnabled: {
      type: Boolean
    },
    specs: {
      type: Array
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if slug is taken
 * @param {string} slug - The product's slug
 * @param {ObjectId} [excludeProductId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isProductSlugTaken = async function (slug, excludeProductId) {
  const product = await this.findOne({ slug, _id: { $ne: excludeProductId } });
  return !!product;
};

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// productSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// productSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
