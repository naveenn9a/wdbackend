const httpStatus = require('http-status');
const { pick, pickRegex } = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const slugify = require('slugify')
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  let modifiedSlug = Object.assign({}, req.body);
  modifiedSlug.slug = slugify(modifiedSlug.slug, { strict: true });
  const product = await productService.createProduct(modifiedSlug);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pickRegex(req.query, ['name', 'slug']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  let modifiedSlug = Object.assign({}, req.body);
  modifiedSlug.slug = slugify(modifiedSlug.slug, { strict: true });
  const product = await productService.updateProductById(req.params.productId, modifiedSlug);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
